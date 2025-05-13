export const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        home: "Home",
        subscriptions: "Subscriptions",
        calculate: "Calculate",
        docs: "Documents",
        contacts: "Contacts",
        login: "Login",
        register: "Register",
        profile: "Profile",
        subscription: {
          free: "Free",
          premium: "Premium",
          free1: "Basic calculation",
          free2: "Limited access",
          premium1: "Advanced calculation",
          premium2: "Full access"
        }
      },

      // Home page
      home: {
        title: "Calculate materials for your home",
        subtitle: "Simple and accurate calculator for planning the construction of your dream home",
        calculate: "Calculate",
        features: {
          accurate: {
            title: "Accurate calculations",
            description: "Get a detailed list of required materials with precise volumes"
          },
          various: {
            title: "Various house types",
            description: "Support for brick, wooden, concrete houses and block houses"
          },
          export: {
            title: "Export results",
            description: "Save results in PDF and PNG formats for future use"
          }
        }
      },

      // House Type Selector
      houseTypeSelector: {
        title: "What will your house be like?",
        brick: "Brick",
        wooden: "Wooden",
        concrete: "Concrete",
        blocks: "Gas/Foam Blocks"
      },

      // Calculation page
      calculation: {
        types: {
          brick: "BRICK concept",
          wooden: "WOODEN concept",
          concrete: "CONCRETE concept",
          blocks: "GAS/FOAM BLOCKS concept"
        },
        sections: {
          foundation: "Foundation",
          walls: "Walls",
          roof: "Roof"
        },
        calculate: "Calculate",
        
        foundation: {
          title: "FOUNDATION",
          width: "Width (m)",
          depth: "Depth (m)",
          length: "Length (m)",
          type: "Type",
          finishing: "Finishing",
          basement: "Basement",
          basementFloor: "Basement floor",
          floorMaterial: "Floor material",
          wallMaterial: "Wall material",
          selectType: "Select type",
          selectFinishing: "Select finishing",
          selectFloorMaterial: "Select floor material",
          selectWallMaterial: "Select wall material"
        },
        
        walls: {
          title: "WALLS",
          addWall: "Add wall",
          noWalls: "No walls added yet",
          addFirstWall: "Add first wall",
          wall: "Wall",
          width: "Width in blocks (pcs)",
          length: "Length (m)",
          height: "Height (m)",
          material: "Material",
          mortar: "Mortar (auto-calculation)",
          insulation: "Insulation",
          finishing: "Finishing",
          selectMaterial: "Select material",
          selectInsulation: "Select insulation",
          selectFinishing: "Select finishing",
          openings: "Openings",
          addOpening: "Add opening",
          noOpenings: "No openings added",
          openingType: "Opening type",
          selectOpeningType: "Select type",
          door: "Door",
          window: "Window"
        },
        
        roof: {
          title: "ROOF",
          types: "Types",
          metalFrame: "Metal frame",
          wooden: "Wooden",
          reinforcedConcrete: "Reinforced concrete roof",
          combined: "Combined roof structure",
          truss: "Truss roof frame",
          material: "Roof finishing material",
          length: "Length (m)",
          width: "Width (m)",
          area: "Roof area (auto-calculation)",
          selectMaterial: "Select material"
        }
      },

      // Result page
      result: {
        title: "Calculation Results",
        table: {
          material: "Material",
          quantity: "Quantity",
          unit: "Unit"
        },
        download: {
          png: "Download .png",
          pdf: "Download .pdf"
        },
        goHome: "Go to Home"
      },

      // Authentication
      auth: {
        title: "Welcome to HouseCraft",
        description: "Sign in to save your calculations and access premium features",
        login: {
          title: "Login",
          submit: "Login",
          processing: "Logging in...",
          error: "Invalid username or password",
          forgotPassword: "Forgot password?"
        },
        register: {
          title: "Register",
          submit: "Register",
          processing: "Registering...",
          error: "Registration failed, please try again"
        },
        fields: {
          name: "Name",
          lastname: "Last name",
          username: "Email",
          password: "Password"
        },
        forgotPassword: {
          title: "Password Recovery",
          submit: "Send reset link"
        },
        hero: {
          title: "Calculate your dream home materials",
          description: "HouseCraft helps you estimate construction materials with precision and ease.",
          benefit1: "Accurate material calculations for your project",
          benefit2: "Save and manage multiple construction projects",
          benefit3: "Export results in various formats for contractors"
        }
      },

      // Profile
      profile: {
        title: "User Profile",
        editProfile: "Edit Profile",
        history: "Calculation History",
        settings: "Settings",
        logout: "Logout",
        loggingOut: "Logging out...",
        myInfo: "My Information",
        newPassword: "New password",
        saveChanges: "Save changes",
        updateSuccess: "Profile updated",
        updateSuccessDescription: "Your profile has been updated successfully"
      },

      // Documents
      docs: {
        title: "Documents",
        regulatory: {
          title: "Regulatory Documents",
          userAgreement: "User Agreement",
          privacyPolicy: "Privacy Policy",
          termsOfUse: "Terms of Use"
        },
        technical: {
          title: "Technical Documents",
          userManual: "User Manual",
          technicalDocs: "Technical Documentation",
          calculationStandards: "Calculation Standards"
        }
      },

      // Contacts
      contacts: {
        title: "Contacts",
        form: {
          title: "Contact Us",
          name: "Your name",
          email: "Email",
          subject: "Subject",
          message: "Message",
          submit: "Send"
        },
        companyInfo: {
          title: "Company Information",
          address: "Address",
          addressValue: "ул. Лермонтова, 126, Иркутск, Россия",
          phone: "Phone",
          email: "Email",
          workingHours: "Working Hours",
          workingHoursValue: "Mon-Fri: 9:00 AM - 6:00 PM",
          socialMedia: "Social Media"
        },
        formSuccess: "Message sent",
        formSuccessDescription: "We will contact you soon"
      },

      // Footer
      footer: {
        about: {
          title: "About Us",
          description: "HouseCraft – a simple and accurate calculator for planning the construction of your dream home."
        },
        contacts: {
          title: "Contacts",
          address: "Lermontova St. 126, Irkutsk"
        },
        docs: {
          title: "Documents",
          userAgreement: "User Agreement",
          privacyPolicy: "Privacy Policy",
          termsOfUse: "Terms of Use"
        },
        copyright: "All rights reserved"
      },

      // Materials
      materials: {
        brick: "Brick",
        concrete: "Concrete",
        "reinforced-concrete": "Reinforced concrete",
        "concrete-mixture": "Concrete mixture",
        rebar: "Rebar (reinforcement)",
        wood: "Wood",
        gasblock: "Gas block",
        foamblock: "Foam block",
        timber: "Timber",
        log: "Log",
        mineral: "Mineral wool",
        foam: "Foam plastic",
        eco: "Eco wool",
        siding: "Siding",
        boards: "Boards",
        shingles: "Shingles",
        metal: "Metal tiles",
        mortar: "Mortar",
        "concrete-foundation": "Concrete (foundation)",
        "wood-foundation": "Wood (foundation)",
        "brick-foundation": "Brick (foundation)",
        "gasblock-foundation": "Gas blocks (foundation)",
        "foamblock-foundation": "Foam blocks (foundation)",
        "basement-brick": "Brick (basement walls)",
        "basement-mortar": "Mortar (basement)",
        "basement-wood": "Wood (basement walls)",
        "basement-gasblock": "Gas blocks (basement walls)",
        "basement-foamblock": "Foam blocks (basement walls)",
        "basement-floor-wood": "Wood (basement floor)",
        "basement-floor-brick": "Brick (basement floor)",
        "basement-floor-reinforced-concrete": "Reinforced concrete (basement floor)",
        plaster: "Cement plaster",
        decorativePlaster: "Decorative textured plaster",
        compositePanels: "Composite facade panels",
        naturalStone: "Natural stone veneer",
        facadePanels: "Engineered facade panels",
        blockHouse: "Wooden block house siding",
        woodenPanels: "Engineered wood panels",
        extrudedPolystyrene: "Extruded polystyrene (XPS) boards",
        stoneWool: "Basalt mineral wool",
        glassWool: "Fiberglass insulation",
        polyurethane: "Spray polyurethane foam (SPF)",
        cellulose: "Cellulose fiber insulation",
        reinforcedConcrete: "Reinforced concrete",
        monolithicConcrete: "Cast-in-place concrete",
        porousConcrete: "Aerated concrete",
        metalTile: "Metal roof tiles",
        metalSheets: "Corrugated metal roofing",
        ceramicTile: "Ceramic roof tiles",
        bitumenTile: "Bitumen shingles",
        compositeShingles: "Composite roof shingles",
        slate: "Slate roofing",
        woodenShingles: "Wooden shakes and shingles",
        monolithicSlab: "Monolithic concrete slab foundation",
        pileGrillage: "Pile and grillage foundation",
        stripFoundation: "Continuous strip foundation",
        pileFoundation: "Driven pile foundation",
        rubble: "Rubble stone masonry",
        screwPile: "Helical screw pile foundation",
        concretePillars: "Concrete pier foundation",
        stone: "Natural stone masonry",
        floatingFoundation: "Floating raft foundation",
        ceramicBrick: "Ceramic building brick",
        clinkerBrick: "Clinker facing brick",
        silicateBrick: "Calcium silicate brick",
        thermoWood: "Thermally modified timber",
        imitationTimber: "Wood cladding boards",
        keramsitBlock: "Expanded clay aggregate block",
        cinderBlock: "Cinder concrete block",
        arboliteBlock: "Wood concrete blocks",
        glulam: "Glued laminated timber (Glulam beams)",
        clb: "Cross-laminated timber (CLT panels)",
        frameWooden: "Timber frame structure"
      },

      // Units
      units: {
        pcs: "pcs",
        m3: "m³",
        m2: "m²",
        kg: "kg"
      }
    }
  },
  ru: {
    translation: {
      // Navigation
      nav: {
        home: "Главная",
        subscriptions: "Подписки",
        calculate: "Расчёт",
        docs: "Документы",
        contacts: "Контакты",
        login: "Войти",
        register: "Регистрация",
        profile: "Профиль",
        subscription: {
          free: "Бесплатно",
          premium: "Платно",
          free1: "Базовый расчет",
          free2: "Ограниченный доступ",
          premium1: "Расширенный расчет",
          premium2: "Полный доступ"
        }
      },

      // Home page
      home: {
        title: "Рассчитайте материалы для вашего дома",
        subtitle: "Простой и точный калькулятор для планирования строительства дома вашей мечты",
        calculate: "Рассчитать",
        features: {
          accurate: {
            title: "Точные расчеты",
            description: "Получите детальный список необходимых материалов с точными объемами"
          },
          various: {
            title: "Различные типы домов",
            description: "Поддержка кирпичных, деревянных, бетонных домов и домов из блоков"
          },
          export: {
            title: "Экспорт результатов",
            description: "Сохраняйте результаты в форматах PDF и PNG для дальнейшего использования"
          }
        }
      },

      // House Type Selector
      houseTypeSelector: {
        title: "Каким будет дом?",
        brick: "Кирпичный",
        wooden: "Деревянный",
        concrete: "Бетонный",
        blocks: "Газоблоки и Пеноблоки"
      },

      // Calculation page
      calculation: {
        types: {
          brick: "КИРПИЧНАЯ концепция",
          wooden: "ДЕРЕВЯННАЯ концепция",
          concrete: "БЕТОННАЯ концепция",
          blocks: "ГАЗОБЛОКИ И ПЕНОБЛОКИ концепция"
        },
        sections: {
          foundation: "Фундамент",
          walls: "Стены",
          roof: "Крыша"
        },
        calculate: "Рассчитать",
        
        foundation: {
          title: "ФУНДАМЕНТ",
          width: "Ширина (м)",
          depth: "Глубина (м)",
          length: "Длина (м)",
          type: "Тип",
          finishing: "Отделка",
          basement: "Подвал",
          basementFloor: "Пол подвала",
          floorMaterial: "Материал пола",
          wallMaterial: "Материал стен",
          selectType: "Выберите тип",
          selectFinishing: "Выберите отделку",
          selectFloorMaterial: "Выберите материал пола",
          selectWallMaterial: "Выберите материал стен"
        },
        
        walls: {
          title: "СТЕНЫ",
          addWall: "Добавить стену",
          noWalls: "Стены еще не добавлены",
          addFirstWall: "Добавить первую стену",
          wall: "Стена",
          width: "Ширина в блоках (шт)",
          length: "Длина (м)",
          height: "Высота (м)",
          material: "Материал",
          mortar: "Раствор (авторасчет)",
          insulation: "Утеплитель",
          finishing: "Отделка",
          selectMaterial: "Выберите материал",
          selectInsulation: "Выберите утеплитель",
          selectFinishing: "Выберите отделку",
          openings: "Проёмы",
          addOpening: "Добавить проём",
          noOpenings: "Проёмы не добавлены",
          openingType: "Тип проёма",
          selectOpeningType: "Выберите тип",
          door: "Дверь",
          window: "Окно"
        },
        
        roof: {
          title: "КРЫША",
          types: "Типы крыши",
          metalFrame: "Металлический каркас",
          wooden: "Деревянная стропильная",
          reinforcedConcrete: "Железобетонная крыша",
          combined: "Комбинированная крыша",
          truss: "Ферменная конструкция крыши",
          material: "Кровельный материал",
          length: "Длина (м)",
          width: "Ширина (м)",
          area: "Площадь крыши (авторасчёт)",
          selectMaterial: "Выберите материал"
        }
      },

      // Result page
      result: {
        title: "Результаты расчета",
        table: {
          material: "Материал",
          quantity: "Количество",
          unit: "Единица измерения"
        },
        download: {
          png: "Скачать .png",
          pdf: "Скачать .pdf"
        },
        goHome: "На Главную"
      },

      // Authentication
      auth: {
        title: "Добро пожаловать в HouseCraft",
        description: "Войдите, чтобы сохранять расчеты и получить доступ к премиум функциям",
        login: {
          title: "Вход",
          submit: "Войти",
          processing: "Вход...",
          error: "Пароль или Логин не верен",
          forgotPassword: "Забыли пароль?"
        },
        register: {
          title: "Регистрация",
          submit: "Зарегистрироваться",
          processing: "Регистрация...",
          error: "Ошибка регистрации, попробуйте еще раз"
        },
        fields: {
          name: "Имя",
          lastname: "Фамилия",
          username: "Email",
          password: "Пароль"
        },
        forgotPassword: {
          title: "Восстановление пароля",
          submit: "Отправить ссылку для сброса"
        },
        hero: {
          title: "Рассчитывайте материалы для вашего дома мечты",
          description: "HouseCraft помогает оценить строительные материалы с точностью и легкостью.",
          benefit1: "Точные расчеты материалов для вашего проекта",
          benefit2: "Сохраняйте и управляйте несколькими строительными проектами",
          benefit3: "Экспортируйте результаты в различных форматах для подрядчиков"
        }
      },

      // Profile
      profile: {
        title: "Профиль пользователя",
        editProfile: "Редактировать профиль",
        history: "История расчетов",
        settings: "Настройки",
        logout: "Выйти",
        loggingOut: "Выход...",
        myInfo: "Мои данные",
        newPassword: "Новый пароль",
        saveChanges: "Сохранить изменения",
        updateSuccess: "Профиль обновлен",
        updateSuccessDescription: "Ваш профиль был успешно обновлен"
      },

      // Documents
      docs: {
        title: "Документы",
        regulatory: {
          title: "Нормативные документы",
          userAgreement: "Пользовательское соглашение",
          privacyPolicy: "Политика конфиденциальности",
          termsOfUse: "Условия использования"
        },
        technical: {
          title: "Технические документы",
          userManual: "Руководство пользователя",
          technicalDocs: "Техническая документация",
          calculationStandards: "Нормативы для расчетов"
        }
      },

      // Contacts
      contacts: {
        title: "Контакты",
        form: {
          title: "Связаться с нами",
          name: "Ваше имя",
          email: "Email",
          subject: "Тема",
          message: "Сообщение",
          submit: "Отправить"
        },
        companyInfo: {
          title: "Информация о компании",
          address: "Адрес",
          addressValue: "ул. Лермонтова, 126, Иркутск, Россия",
          phone: "Телефон",
          email: "Email",
          workingHours: "Рабочие часы",
          workingHoursValue: "Пн-Пт: 9:00 - 18:00",
          socialMedia: "Социальные сети"
        },
        formSuccess: "Сообщение отправлено",
        formSuccessDescription: "Мы свяжемся с вами в ближайшее время"
      },

      // Footer
      footer: {
        about: {
          title: "О компании",
          description: "HouseCraft – простой и точный калькулятор для планирования строительства дома вашей мечты."
        },
        contacts: {
          title: "Контакты",
          address: "ул. Лермонтова, 126, Иркутск"
        },
        docs: {
          title: "Документы",
          userAgreement: "Пользовательское соглашение",
          privacyPolicy: "Политика конфиденциальности",
          termsOfUse: "Условия использования"
        },
        copyright: "Все права защищены"
      },

      // Materials
      materials: {
        brick: "Кирпич",
        concrete: "Бетон",
        "reinforced-concrete": "Железобетон",
        "concrete-mixture": "Бетонная смесь",
        rebar: "Арматура",
        wood: "Дерево",
        gasblock: "Газоблок",
        foamblock: "Пеноблок",
        timber: "Брус",
        log: "Бревно",
        mineral: "Минеральная вата",
        foam: "Пенопласт",
        eco: "Эковата",
        siding: "Сайдинг",
        boards: "Доски",
        shingles: "Шифер",
        metal: "Металлочерепица",
        mortar: "Раствор",
        "concrete-foundation": "Бетон (фундамент)",
        "wood-foundation": "Дерево (фундамент)",
        "brick-foundation": "Кирпич (фундамент)",
        "gasblock-foundation": "Газоблоки (фундамент)",
        "foamblock-foundation": "Пеноблоки (фундамент)",
        "basement-brick": "Кирпич (стены подвала)",
        "basement-mortar": "Раствор (подвал)",
        "basement-wood": "Дерево (стены подвала)",
        "basement-gasblock": "Газоблоки (стены подвала)",
        "basement-foamblock": "Пеноблоки (стены подвала)",
        "basement-floor-wood": "Дерево (пол подвала)",
        "basement-floor-brick": "Кирпич (пол подвала)",
        "basement-floor-reinforced-concrete": "Железобетон (пол подвала)",
        plaster: "Цементная штукатурка",
        decorativePlaster: "Декоративная фактурная штукатурка",
        compositePanels: "Композитные фасадные панели",
        naturalStone: "Облицовка натуральным камнем",
        facadePanels: "Фасадные панели",
        blockHouse: "Фасадный блок-хаус",
        woodenPanels: "Деревянные стеновые панели",
        extrudedPolystyrene: "Экструдированный пенополистирол (XPS)",
        stoneWool: "Базальтовая минеральная вата",
        glassWool: "Стекловолоконный утеплитель",
        polyurethane: "Напыляемый пенополиуретан (ППУ)",
        cellulose: "Целлюлозный эковолоконный утеплитель",
        reinforcedConcrete: "Армированный железобетон",
        monolithicConcrete: "Монолитный бетон",
        porousConcrete: "Ячеистый бетон",
        metalTile: "Металлочерепица",
        metalSheets: "Профнастил кровельный",
        ceramicTile: "Керамическая черепица",
        bitumenTile: "Битумная черепица (гонт)",
        compositeShingles: "Композитная черепица",
        slate: "Сланцевая кровля",
        woodenShingles: "Деревянная дранка и гонт",
        monolithicSlab: "Монолитная железобетонная плита",
        pileGrillage: "Свайно-ростверковый фундамент",
        stripFoundation: "Ленточный фундамент",
        pileFoundation: "Свайный фундамент",
        rubble: "Бутовая кладка",
        screwPile: "Фундамент на винтовых сваях",
        concretePillars: "Столбчатый фундамент",
        stone: "Каменная кладка",
        floatingFoundation: "Плавающий фундамент (ФПЛ)",
        ceramicBrick: "Керамический кирпич",
        clinkerBrick: "Клинкерный облицовочный кирпич",
        silicateBrick: "Силикатный кирпич",
        thermoWood: "Термомодифицированная древесина",
        imitationTimber: "Планкен (имитация бруса)",
        keramsitBlock: "Керамзитобетонные блоки",
        cinderBlock: "Шлакоблоки",
        arboliteBlock: "Арболитовые блоки (древобетон)",
        glulam: "Клееный брус (КДК)",
        clb: "Перекрестно-клееные панели (CLT)",
        frameWooden: "Каркасно-щитовая конструкция"
      },

      // Units
      units: {
        pcs: "шт",
        m3: "м³",
        m2: "м²",
        kg: "кг"
      }
    }
  }
};
