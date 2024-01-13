import { FromsProjectTemplatePage } from './app.po';

describe('FromsProject App', function() {
  let page: FromsProjectTemplatePage;

  beforeEach(() => {
    page = new FromsProjectTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
