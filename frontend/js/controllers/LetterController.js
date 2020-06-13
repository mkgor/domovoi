app.controller('LetterController', function ($scope, $rootScope) {
    $rootScope.checkAuth();

    $rootScope.pageTitle = "Коллективные письма в УК";

    $scope.activeLetter = null;

    $scope.letters = [
        {
            id: 1,
            title: "Обращение от жильцов подъезда №5",
            date: "7 июня, 2020",
            text: "Мы, жильцы подьезда №5, длительное время проживаем в плохих бытовых условиях. С момента ввода в эксплуатацию дома в 1965 у нас никогда не производился ремонт. Дверь входа в польезд не защищена и не оборудована домофоном, поэтому к нам на лестничные площадки беспрепятственно проходят и творят безобразия пришлые пьяницы и бомжи.\n" +
                "\n\n" +
                "Для нормального и относительно комфортного проживания в своих коммунальных квартирах у нас нет элементарных условий, старая электропроводка уже давно отслужила своё предназначение и теперь является явной угрозой жизни и здоровью жильцов, водопроводные трубы и канализация проржавели и периодически рвутся, запорная арматура не держит, что в недалёкой перспективе грозит затоплением нижних этажей и разрушением стен и перекрытий самого здания.\n" +
                "\n\n" +
                "Просим Вас, организовать кап. ремонт сантехнического и электро оборудования нашего подьеза, а также разрешить вышеуказанные проблемы уже в этом году.",
            user: {
                name: "Николай",
                last_name: "Иванов",
                email: "nikolai.ivanov@mail.ru",
                avatar: '/img/avatars/demo1.png'
            },
            signatories: [],
            attachments: [],
            classList: {}
        },

        {
            id: 2,
            title: "Требуется ремонт канализации",
            date: "21 мая, 2020",
            text: "На протяжении 2019-2020 года во всех подьездах нашего дома стоит стойкий запах канализационных вод, в связи с тем , что в первом подьезде данного дома протекает канализация которая течет под домом в подвале. Наш дом введен в эксплуатацию и заселен был в мае 1978 года. То есть общие канализационные ктояки и канализационные сети, которые находятся в подвале данного дома находятся в эксплуатации уже более 35 лет. Кап ремонт данных канализационных внутридомовых сетей не проводился, данные канализационные сети требуют срочного ремонта во всем доме.\n" +
                "\n" +
                "Убедительно просим срочно отремонтировать внутридомовую канализацию. ",
            user: {
                name: "Андрей",
                last_name: "Яковлев",
                email: "nikolai.ivanov@mail.ru",
                avatar: '/img/avatars/demo2.jpg'
            },
            signatories: [
                {
                    fio: 'Денисов Виталий',
                    date: '22 мая 2020 г.'
                },
                {
                    fio: 'Лопухова Татьяна',
                    date: '22 мая 2020 г.'
                },
                {
                    fio: 'Николаева Ольга',
                    date: '23 мая 2020 г.'
                }
            ],
            attachments: [],
            classList: {}
        },
        {
            id: 3,
            title: "Нужен ремонт подьезда",
            date: "28 мая, 2020",
            text: "Просим вас, сделать ремонт в подьезде №3, после пожара; срубить тополь котоырй находится во дворе и при сильных порывах ветра от него каждый раз отрываются большие ветки и падают на гаражи, сараи, а рядом ЛЭП, что может привести к повреждению кабеля. Просим отнестись к нашей просьбе положительно, иначе будем вынуждены обращаться в администрацию города",
            user: {
                name: "Инесса",
                last_name: "Панкратова",
                email: "nikolai.ivanov@mail.ru",
                avatar: '/img/avatars/demo3.jpg'
            },
            signatories: [
                {
                    fio: 'Головлев Андрей',
                    date: '29 мая 2020 г.'
                },
                {
                    fio: 'Захарченко Нина',
                    date: '29 мая 2020 г.'
                },
                {
                    fio: 'Харитонова Юлия',
                    date: '29 мая 2020 г.'
                }
            ],
            attachments: [],
            classList: {}
        },

        {
            id: 4,
            title: "Протекает крыша",
            date: "23 мая, 2020",
            text: "\n" +
                "\n" +
                "Мы обращаемся к Вам по следующему поводу: на протяжении двху лет в нашем подьезде протекает крыша, что приводит к разрушению квартир и дома в целом. С появлением проблемы, периодически , производились обращения, но никаких мер принято не было, просим вас разобраться в сложившейся ситуации.",
            user: {
                name: "Евгений",
                last_name: "Захаров",
                email: "nikolai.ivanov@mail.ru",
                avatar: '/img/avatars/demo4.jpg'
            },
            signatories: [],
            attachments: [],
            classList: {}
        }
    ];

    /**
     * Setting current letter to specified
     * @param id
     */
    $scope.setActiveLetter = letter => {
        $scope.letters.forEach((letter) => {
            letter.classList = {};
        });

        letter.classList = {"list_item_active": true};

        $scope.activeLetter = letter;
    };
});