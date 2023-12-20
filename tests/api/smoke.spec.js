const { expect } = require('chai');

const url = urlPath => `http://localhost:1111${urlPath}`;

describe('API Smoke Test', () => {
  beforeAll(async () => {
    try {
      const healthResponse = await fetch(url('/health'));
      expect(
        healthResponse.status,
        `Backend service is not healthy: ${healthResponse.statusText}`,
      ).to.equal(200);
      const jsonResponse = await healthResponse.json();
      expect(jsonResponse.healthy, `Service is not healthy`).to.be.true;
    } catch (error) {
      throw new Error(`Service is not healthy: ${error}`);
    }
  });

  test(`All routes are valid`, async () => {
    const { routes } = await fetch(url('/health')).then(r => r.json());
    const routesErrors = [];
    for (let route of routes) {
      const response = await fetch(url(route), { method: 'head' });
      const status = response.status;
      if (status != 200) {
        routesErrors.push({
          route,
          status,
        });
      }
    }
    if (routesErrors.length > 0) {
      throw new Error(`Routes issues: ${JSON.stringify(routesErrors)}`);
    }
  });
});
