import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('*/api/reservation/list', () => {
    return HttpResponse.json([
      {
        id: 'ed8440cc-2d8a-11ef-b142-0242ac120003',
        createdAt: 1718726018,
        open: true,
      },
      {
        id: 'ed8440cc-2d8a-11ef-b142-0242ac120003',
        createdAt: 1718726018,
        open: false,
      },
    ])
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
      open: true,
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
]
