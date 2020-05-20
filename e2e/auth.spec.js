describe('Example', () => {
  beforeEach(async () => {
    // await device.reloadReactNative()
  })

  /**
   *
   */
  it('AuthHome', async () => {
    await expect(element(by.id('components/AuthHome'))).toBeVisible()
    await element(by.id('components/AuthHome/Actions/signin')).tap()
    await expect(element(by.id('components/AuthUsername'))).toBeVisible()
  })

  /**
   *
   */
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

  /**
   *
   */
  it('AuthPassword', async () => {
    await expect(element(by.id('components/AuthPassword'))).toBeVisible()

    /**
     * Password length constraint validation 
     */
    await element(by.id('components/AuthPassword/Form/password')).clearText()
    await element(by.id('components/AuthPassword/Form/password')).typeText('aa')
    await element(by.id('components/AuthPassword/Form/submit')).tap()
    await expect(element(by.id('components/AuthPhone'))).toBeNotVisible()

    /**
     * Password chars constraint validation 
     */
    await element(by.id('components/AuthPassword/Form/password')).clearText()
    await element(by.id('components/AuthPassword/Form/password')).typeText('asd-.')
    await element(by.id('components/AuthPassword/Form/submit')).tap()
    await expect(element(by.id('components/AuthPhone'))).toBeNotVisible()

    /**
     * Password reservation
     */
    const password = `123123123`
    await element(by.id('components/AuthPassword/Form/password')).clearText()
    await element(by.id('components/AuthPassword/Form/password')).typeText(password)
    await element(by.id('components/AuthPassword/Form/submit')).tap()
    await expect(element(by.id('components/AuthPhone'))).toBeVisible()
  })

  /**
   *
   */
  it('AuthPhone', async () => {
    await expect(element(by.id('components/AuthPhone'))).toBeVisible()

    /**
     * Phone length constraint validation 
     */
    await element(by.id('components/AuthPhone/Form/phone')).clearText()
    await element(by.id('components/AuthPhone/Form/phone')).typeText('aa')
    await element(by.id('components/AuthPhone/Form/submit')).tap()
    await expect(element(by.id('components/AuthPhoneConfirm'))).toBeNotVisible()

    /**
     * Phone chars constraint validation 
     */
    await element(by.id('components/AuthPhone/Form/phone')).clearText()
    await element(by.id('components/AuthPhone/Form/phone')).typeText('asd-.')
    await element(by.id('components/AuthPhone/Form/submit')).tap()
    await expect(element(by.id('components/AuthPhoneConfirm'))).toBeNotVisible()

    /**
     * Phone reservation
     */
    const phone = `+123123123`
    await element(by.id('components/AuthPhone/Form/phone')).clearText()
    await element(by.id('components/AuthPhone/Form/phone')).typeText(phone)
    await element(by.id('components/AuthPhone/Form/submit')).tap()
    await expect(element(by.id('components/AuthPhoneConfirm'))).toBeVisible()
  })
}) 