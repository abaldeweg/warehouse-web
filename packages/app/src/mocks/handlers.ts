import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('*/api/reservation/list', () => {
    return HttpResponse.json([
      {
        id: 'ed8490cc-2d8a-11ef-b142-0242ac120003',
        createdAt: new Date().getTime() / 1000,
        notes: 'new reservation',
        open: true,
      },
      {
        id: 'ed8440cc-2d8a-11ef-b142-0242ac120003',
        createdAt: 1718726018,
        notes: 'outdated reservation',
        open: false,
      },
      {
        id: 'ed8440cc-2dia-11ef-b142-0242ac120003',
        createdAt: new Date().getTime() / 1000,
        notes: 'empty reservation',
        open: true,
      },
    ])
  }),
  http.get('*/api/reservation/ed8490cc-2d8a-11ef-b142-0242ac120003', () => {
    return HttpResponse.json({
      id: 'ed8490cc-2d8a-11ef-b142-0242ac120003',
      createdAt: new Date().getTime() / 1000,
      notes: null,
      books: [
        {
          id: '1ca572bf-eb59-11ee-a9bb-02d2ac140010',
          added: 1711411200,
          title: 'Book',
          author: {
            firstname: 'Jane',
            surname: 'Doe',
          },
          genre: {
            name: 'Thriller',
          },
          price: 2.5,
          subtitle: null,
        },
        {
          id: '1caw72bf-eb59-11ee-a9bb-02d2ac140010',
          added: 1711411200,
          title: 'Book',
          author: {
            firstname: 'Jane',
            surname: 'Doe',
          },
          genre: {
            name: 'Thriller',
          },
          price: 2.5,
          subtitle: null,
        },
      ],
      salutation: 'f',
      firstname: 'Jane',
      surname: 'Doe',
      open: true,
      mail: 'contact@store.localhost',
    })
  }),
  http.get('*/api/reservation/ed8440cc-2d8a-11ef-b142-0242ac120003', () => {
    return HttpResponse.json({
      id: 'ed8440cc-2d8a-11ef-b142-0242ac120003',
      createdAt: 1718726018,
      notes: null,
      books: [
        {
          id: '1ca572bf-eb59-11ee-a9bb-02d2ac140010',
          added: 1711411200,
          title: 'Book',
          author: {
            firstname: 'Jane',
            surname: 'Doe',
          },
          genre: {
            name: 'Thriller',
          },
          price: 2.5,
          subtitle: null,
        },
      ],
      salutation: 'f',
      firstname: 'Jane',
      surname: 'Doe',
      open: false,
      mail: 'contact@store.localhost',
    })
  }),
  http.get('*/api/reservation/ed8440cc-2dia-11ef-b142-0242ac120003', () => {
    return HttpResponse.json({
      id: 'ed8440cc-2dia-11ef-b142-0242ac120003',
      createdAt: new Date().getTime() / 1000,
      notes: null,
      books: [],
      salutation: 'f',
      firstname: 'Jane',
      surname: 'Doe',
      open: true,
      mail: 'contact@store.localhost',
    })
  }),
  http.post('*/api/login_check', () => {
    return HttpResponse.json({ token: 'token', refresh_token: 'refresh_token' })
  }),
  http.put('*/api/password', () => {
    return HttpResponse.json({})
  }),
  http.get('*/api/me', () => {
    return HttpResponse.json({
      id: 1,
      username: 'admin',
      roles: ['ROLE_USER'],
      branch: {
        id: 1,
        name: 'Branch 1',
        steps: '0',
        currency: 'EUR',
        ordering: '',
        public: true,
        pricelist: '',
        cart: true,
        content: null,
      },
      isUser: true,
      isAdmin: false,
    })
  }),
  http.get('*/api/book/stats', () => {
    return HttpResponse.json({
      all: 6372,
      available: 4789,
      reserved: 10,
      sold: 600,
      removed: 200,
      storage: 3456.8663,
    })
  }),
  http.put('*/api/book/sell/*', () => {
    return HttpResponse.json({})
  }),
  http.get('*/api/book/1ca572bf-eb59-11ee-a9bb-02d2ac140010', () => {
    return HttpResponse.json({
      id: '1ca572bf-eb59-11ee-a9bb-02d2ac140010',
      branch: {
        id: 1,
        name: 'Branch 1',
        steps: '0',
        currency: 'EUR',
        ordering: '',
        public: true,
        pricelist: '',
        cart: true,
        content: '',
      },
      added: 1705881600,
      title: 'Title',
      shortDescription: 'Short Description',
      author: {
        id: 1,
        firstname: 'Jane',
        surname: 'Doe',
      },
      genre: {
        id: 1,
        name: 'Thriller',
        branch: {
          id: 1,
          name: 'Branch 1',
          steps: '0',
          currency: 'EUR',
          ordering: '',
          public: true,
          pricelist: '',
          cart: true,
          content: '',
        },
        books: 1,
      },
      price: 0,
      sold: false,
      soldOn: null,
      removed: false,
      removedOn: null,
      reserved: false,
      reservedAt: null,
      releaseYear: 2021,
      condition: {
        id: 1,
        name: 'New',
      },
      tags: [
        {
          id: 1,
          name: 'Thriller',
          branch: {
            id: 1,
            name: 'Branch 1',
            steps: '0',
            currency: 'EUR',
            ordering: '',
            public: true,
            pricelist: '',
            cart: true,
            content: '',
          },
          books: 1,
        },
      ],
      reservation_id: null,
      recommendation: false,
      inventory: null,
      format: {
        id: 1,
        name: 'Hardcover',
        branch: {
          id: 1,
          name: 'Branch 1',
          steps: '0',
          currency: 'EUR',
          ordering: '',
          public: true,
          pricelist: '',
          cart: true,
          content: '',
        },
      },
      subtitle: 'Subtitle',
      duplicate: false,
    })
  }),
  http.put('*/api/book/1ca572bf-eb59-11ee-a9bb-02d2ac140010', () => {
    return HttpResponse.json({})
  }),
]
