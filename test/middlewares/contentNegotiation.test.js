const httpMocks = require('node-mocks-http');
const contentNegotiation = require('../../middlewares/contentNegotiation');

const myBlog = [
  {
    id: 1,
    title: 'Hi Everyone, i am saifur',
    username: 'saifur1',
    description: 'hekknhkfnghdfdfdfdfdfdfdfdfdfdfdfdfhvvdlknkvsdnnnlsdf',
    createdAt: '2022-06-21T12:00:22.000Z',
    updatedAt: '2022-06-22T05:45:27.000Z',
  },
];

const jsonData = [
  {
    id: 1,
    title: 'Hi Everyone, i am saifur',
    username: 'saifur1',
    description: 'hekknhkfnghdfdfdfdfdfdfdfdfdfdfdfdfhvvdlknkvsdnnnlsdf',
    createdAt: '2022-06-21T12:00:22.000Z',
    updatedAt: '2022-06-22T05:45:27.000Z',
  },
];

const plainData = `
id                  : 1
title               : Hi Everyone, i am saifur
username            : saifur1
description         : hekknhkfnghdfdfdfdfdfdfdfdfdfdfdfdfhvvdlknkvsdnnnlsdf
createdAt           : 2022-06-21T12:00:22.000Z
updatedAt           : 2022-06-22T05:45:27.000Z
`;

const xmlData = `<id>1</id><title>Hi Everyone, i am saifur</title><username>saifur1</username><description>hekknhkfnghdfdfdfdfdfdfdfdfdfdfdfdfhvvdlknkvsdnnnlsdf</description><createdAt>2022-06-21T12:00:22.000Z</createdAt><updatedAt>2022-06-22T05:45:27.000Z</updatedAt>`;

const htmlData = `{
  <span class="string key">"id"</span>: <span class="number">1</span>,
  <span class="string key">"title"</span>: <span class="string value">"Hi Everyone, i am saifur"</span>,
  <span class="string key">"username"</span>: <span class="string value">"saifur1"</span>,
  <span class="string key">"description"</span>: <span class="string value">"hekknhkfnghdfdfdfdfdfdfdfdfdfdfdfdfhvvdlknkvsdnnnlsdf"</span>,
  <span class="string key">"createdAt"</span>: <span class="string value">"2022-06-21T12:00:22.000Z"</span>,
  <span class="string key">"updatedAt"</span>: <span class="string value">"2022-06-22T05:45:27.000Z"</span>
  }`;

describe('content negotiation testing', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('content negotiation testing for xml data', async () => {
    const mreq = httpMocks.createRequest({
      headers: {
        accept: 'application/xml',
      },
    });
    const mres = httpMocks.createResponse({
      req: mreq,
    });
    const mStatus = 201;
    await contentNegotiation.sendResponse(mreq, mres, myBlog[0], mStatus);
    const data = mres.send()._getData();
    expect(data).toBe(xmlData);
    expect(mres.statusCode).toBe(mStatus);
  });

  test('content negotiation testing for html data', async () => {
    const mreq = httpMocks.createRequest({
      headers: {
        accept: 'text/html',
      },
    });
    const mres = httpMocks.createResponse({
      req: mreq,
    });
    const mStatus = 201;
    await contentNegotiation.sendResponse(mreq, mres, myBlog[0], mStatus);
    const data = mres.send()._getData();
    expect(data).toBeTruthy();
    expect(mres.statusCode).toBe(mStatus);
  });

  test('content negotiation testing for plain text', async () => {
    const mreq = httpMocks.createRequest({
      headers: {
        accept: 'text/plain',
      },
    });
    const mres = httpMocks.createResponse({
      req: mreq,
    });
    await contentNegotiation.sendResponse(mreq, mres, myBlog[0]);
    const data = mres.send()._getData();
    expect(data).toBeTruthy();
    expect(mres.statusCode).toBe(200);
  });

  test('content negotiation testing for json data', async () => {
    const mreq = httpMocks.createRequest({
      headers: {
        accept: 'application/json',
      },
    });
    const mres = httpMocks.createResponse({
      req: mreq,
    });
    await contentNegotiation.sendResponse(mreq, mres, myBlog[0]);
    const data = mres.send()._getData();
    expect(data).toEqual(jsonData[0]);
    expect(mres.statusCode).toBe(200);
  });

  test('content negotiation testing for default', async () => {
    const mreq = httpMocks.createRequest({
      headers: {
        accept: 'AnythingThatIsNotAvailable',
      },
    });
    const mres = httpMocks.createResponse({
      req: mreq,
    });
    await contentNegotiation.sendResponse(mreq, mres, myBlog[0]);
    const data = mres.send()._getData();
    expect(data).toEqual(jsonData[0]);
    expect(mres.statusCode).toBe(200);
  });
});
