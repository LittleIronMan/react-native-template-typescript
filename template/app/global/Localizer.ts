const ru = {
    ok: "Ok",
    cancel: "Отмена",
    create: "Создать",
    select: "Выбрать",

    windowError_title: "Ошибка",
    windowLoading_loading: "Загрузка",

    titleMenu_signIn: "Вход",
    titleMenu_signUp: "Регистрация",
    titleMenu_myProfile: "Профиль",
    titleMenu_myProjects: "Мои проекты",
    titleMenu_settings: "Настройки",
    titleMenu_help: "Помощь",
    titleMenu_about: "О программе",
    titleMenu_signOut: "Выйти",

    windowSignUp_title: "Регистрация",
    windowSignUp_titleSignIn: "Вход в систему",
    windowSignUp_email: "Email",
    windowSignUp_login: "Логин/Имя",
    windowSignUp_password: "Пароль",
    windowSignUp_password2: "Повторите пароль",
    windowSignUp_invalidEmail: "Некорректный email",
    windowSignUp_passwordTooShort12: "Длина пароля менее 12 символов",
    windowSignUp_atLeastPrefix: "Пароль должен содержать как минимум: ",
    windowSignUp_atLeastOneDigit: "одну цифру (0-9)",
    windowSignUp_atLeastOneSpec: "один символ пунктуации (.,!?+-<>_#:;|/%^*[]{})",
    windowSignUp_atLeastOneUpper: "один символ в ВЕРХНЕМ регистре (А-Я)",
    windowSignUp_atLeastOneLower: "один символ в нижнем регистре (а-я)",
    windowSignUp_passwordsDontMatch: "Пароли не совпадают!",
    windowSignUp_signUp: "Создать",
    windowSignUp_signIn: "Войти",

    windowSelectImage_title: "Выберите изображение",

    windowNewFolder_title: "Новая папка",
    windowNewFolder_folderName: "Название папки",
    windowNewFolder_folderNamePlaceholder: "Новая папка",
    windowNewFolder_foundDuplicates: "Файл или папка с данным именем уже существуют",

    validateForm_required: "Необходимо ввести",
    validateForm_tooShort: "Слишком коротко",
    validateForm_tooLong: "Слишком длинно",
    validateForm_invalidFilename: "Недопустимое имя файла или папки",
};

export default function i18n(key: keyof typeof ru): string {
    return ru[key];
}