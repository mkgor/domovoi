<?php

namespace App\Controller;
use App\Entity\Account;
use App\Entity\House;
use App\Entity\PersonClaim;
use App\Repository\HouseRepository;
use App\Vk\Api;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Security\Core\User\User;

class ApiController extends \FOS\RestBundle\Controller\AbstractFOSRestController
{
    private $em;

    public function __construct(\Doctrine\ORM\EntityManagerInterface $entityManager)
    {
        $this->em = $entityManager;
    }

    /**
     * @Rest\Get("/api/organisation/getByToken")
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @return Response
     */
    public function getOrgByToken(\Symfony\Component\HttpFoundation\Request $request)
    {
        $token = $request->get("token");
        $userRep = $this->getDoctrine()->getRepository(Account::class);
        /** @var Account $user */
        $user = $userRep->findOneBy(["vkToken" => $token]);
        if($user) {
            $owns = $user->getOwnings();
            if($owns->isEmpty()) {
                return $this->handleView($this->view(['status' => 'error', 'descr' => "No properties detected"], Response::HTTP_NOT_FOUND));
            } else {
                return $this->handleView($this->view(['status' => 'ok', 'org' => $owns[0]->getHouse()->getOrg()]));
            }
        } else {
            return $this->handleView($this->view(['status' => 'error', 'descr' => "unathorized"], Response::HTTP_NOT_FOUND));
        }

    }


    /** //https://oauth.vk.com/authorize?client_id=7508602&display=page&redirect_uri=http://localhost:81/api/vkAuthCallback&scope=notifications,email&response_type=code&v=5.110
     * @Rest\Get("/api/vkAuthCallback")
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @return Response
     * @throws \Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     */
    public function getCB(\Symfony\Component\HttpFoundation\Request $request)
    {
        $code = $request->get("code");
        $vkApi = new Api($this->getParameter("VK_SECRET"),$this->getParameter("BACK_URL"));
        $tokenRes = $vkApi->getAuthToken($code);
        $userData = $vkApi->getUserData($tokenRes["access_token"])["response"][0];

       // return $this->handleView($this->view(['status' => 'ok', 'result' => $userData]));
        $userRep = $this->getDoctrine()->getRepository(Account::class);
        /** @var Account $existing */
        $existing = $userRep->findOneBy(["vkId" => $userData["id"]]);
        if(!$existing) {
            $existing = new Account();
            $existing->setVkToken($tokenRes["access_token"])
            ->setCity($userData["city"]["title"])
            ->setVkId($userData["id"])
            ->setFirstName($userData["first_name"])
            ->setLastName($userData["last_name"])
            ->setPhotoUrl($userData["photo_100"])
            ->setBirthDate(new \DateTime($userData["bdate"]));

            $p = mt_rand(1,9);
            $claim = new PersonClaim();
            $claim->addAccount($existing);
            $claim->setDetailedAddress("подъезд " . $p . ", кв " . $p * mt_rand(8,50));
            $claim->setSize(mt_rand(40, 100));
            /** @var HouseRepository $hRep */
            $hRep = $this->getDoctrine()->getRepository(House::class);
            $claim->setHouse($hRep->getRandom());

            $this->em->persist($claim);
        }
        $existing->setVkToken($tokenRes["access_token"]);
        $this->em->persist($existing);

        $this->em->flush();

        $response = new RedirectResponse($this->getParameter("FRONT_URL"));
        $cookie = new Cookie('token', $tokenRes["access_token"], time()+36000);
        $response->headers->setCookie($cookie);

        return $response;
    }

}