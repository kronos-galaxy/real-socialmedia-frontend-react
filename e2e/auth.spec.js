describe('Example', () => {
  beforeEach(async () => {
    // await device.reloadReactNative()
  })

  it('AuthHome', async () => {
    await expect(element(by.id('components/AuthHome'))).toBeVisible()
    await element(by.id('components/AuthHome/Actions/signin')).tap()
  })

  it('AuthUsername', async () => {
    await expect(element(by.id('components/AuthUsername'))).toBeVisible()

    /**
     * Username exists validation 
     */
    await element(by.id('components/AuthUsername/Form/username')).typeText('real')
    await element(by.id('components/AuthUsername/Form/submit')).tap()
    await expect(element(by.id('components/AuthPassword'))).toBeNotVisible()

    /**
     * Username length constraint validation 
     */
    await element(by.id('components/AuthUsername/Form/username')).clearText()
    await element(by.id('components/AuthUsername/Form/username')).typeText('aa')
    await element(by.id('components/AuthUsername/Form/submit')).tap()
    await expect(element(by.id('components/AuthPassword'))).toBeNotVisible()

    /**
     * Username chars constraint validation 
     */
    await element(by.id('components/AuthUsername/Form/username')).clearText()
    await element(by.id('components/AuthUsername/Form/username')).typeText('asd-.')
    await element(by.id('components/AuthUsername/Form/submit')).tap()
    await expect(element(by.id('components/AuthPassword'))).toBeNotVisible()

    /**
     * Username reservation
     */
    const username = `detox${Date.now()}`
    await element(by.id('components/AuthUsername/Form/username')).clearText()
    await element(by.id('components/AuthUsername/Form/username')).typeText(username)
    await element(by.id('components/AuthUsername/Form/submit')).tap()
    await expect(element(by.id('components/AuthPassword'))).toBeVisible()
  })
}) 