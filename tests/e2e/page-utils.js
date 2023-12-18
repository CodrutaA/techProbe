const { expect } = require('@playwright/test');

const expectElementNotVisibleFactory = page => async cssSelector => {
  await expect(page.locator(cssSelector)).not.toBeVisible;
};

const expectElementsNotVisible = async (page, ...cssSelectors) => {
  for (let cssSelector in cssSelectors) {
    await expectElementNotVisibleFactory(page)(cssSelector);
  }
};

const validateElementsText = async (page, ...elementsLocatorAndText) => {
  for (let { cssSelector, expectedText } in elementsLocatorAndText) {
    await expect(page.locator(cssSelector)).toContainText(expectedText);
  }
};

module.exports = {
  expectElementNotVisibleFactory,
  expectElementsNotVisible,
  validateElementsText,
};
