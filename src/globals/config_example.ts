export const Environment = {
  api_version: 1,
  api_url: 'http://localhost:8080'
};

export const Types = {
  appartment: 1,
  person: 2
}

export const ApartmentTypes = {
  sale: {
    name: 'Продажба',
    key: 'sale',
    id: 1
  },
  rent: {
    name: 'Наем',
    key: 'rent',
    id: 2
  }
}

export const UserRoles = {
  user: {
    name: 'Потребител',
    key: 'user',
    id: 1
  },
  admin: {
    name: 'Администратор',
    key: 'admin',
    id: 2
  }
};

export const UserPositions = {
  manager: {
    name: 'Управител',
    key: 'manager',
    id: 1
  },
  broker: {
    name: 'Брокер',
    key: 'broker',
    id: 2
  }
};

export const Sort = {
  date: {
    name: 'Дата',
    key: 'date',
    id: 1
  },
  price: {
    name: 'Цена',
    key: 'price',
    id: 2
  }
};

export const Currency = {
  lev: {
    name: 'лв.',
    nameBG: 'лев',
    key: 'lev',
    id: 1
  },
  euro: {
    name: '€',
    nameBG: 'евро',
    key: 'euro',
    id: 2
  },
  pound: {
    name: '£',
    nameBG: 'паунд',
    key: 'pound',
    id: 3
  },
  dollar: {
    name: '$',
    nameBG: 'долар',
    key: 'dollar',
    id: 4
  },
};

export const Cities = [
  { "name": "София", "id": 22 },
  { "name": "Варна", "id": 3 },
  { "name": "Пловдив", "id": 16 },
  { "name": "Бургас", "id": 2 },
  { "name": "Благоевград", "id": 1 },
  { "name": "Велико Търново", "id": 4 },
  { "name": "Видин", "id": 5 },
  { "name": "Враца ", "id": 6 },
  { "name": "Габрово", "id": 7 },
  { "name": "Добрич", "id": 8 },
  { "name": "Кърджали", "id": 9 },
  { "name": "Кюстендил", "id": 10 },
  { "name": "Ловеч", "id": 11 },
  { "name": "Монтана", "id": 12 },
  { "name": "Пазарджик", "id": 13 },
  { "name": "Плевен", "id": 14 },
  { "name": "Перник", "id": 15 },
  { "name": "Разград", "id": 17 },
  { "name": "Русе", "id": 18 },
  { "name": "Силистра", "id": 19 },
  { "name": "Сливен", "id": 20 },
  { "name": "Смолян", "id": 21 },
  { "name": "Стара Загора", "id": 23 },
  { "name": "Търговище", "id": 24 },
  { "name": "Хасково", "id": 25 },
  { "name": "Шумен", "id": 26 },
  { "name": "Ямбол", "id": 27 }
];

export const FileTypes = {
  image: {
    type: 1,
    suportedTypes: ['image/jpeg', 'image/png', 'image/bmp'],
    maxSize: 8 * 1048576
  }
};