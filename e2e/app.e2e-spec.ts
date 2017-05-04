import { ZabbixExplorerPage } from './app.po';

describe('zabbix-explorer App', () => {
  let page: ZabbixExplorerPage;

  beforeEach(() => {
    page = new ZabbixExplorerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
