 describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative()
  })

  it('AuthHome', async () => {
    await expect(element(by.id('components/AuthHome'))).toBeVisible()
    await element(by.id('components/AuthHome/Actions/signin')).tap()
    await expect(element(by.id('components/AuthUsername'))).toBeVisible()
  })

  // it('should have welcome screen', async () => {
  //   await expect(element(by.id('welcome'))).toBeVisible()
  // })

  // it('should show hello screen after tap', async () => {
  //   await element(by.id('hello_button')).tap()
  //   await expect(element(by.text('Hello!!!'))).toBeVisible()
  // })

  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap()
  //   await expect(element(by.text('World!!!'))).toBeVisible()
  // })
}) 