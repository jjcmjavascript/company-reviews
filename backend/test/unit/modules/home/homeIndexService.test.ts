import { HomeIndexService } from '@modules/home/service/home-index.service';

describe('HomeService', () => {
  const homeIndexService = new HomeIndexService();

  it('it should return HomeIndexFormat', () => {
    expect(homeIndexService.execute());
  });
});
