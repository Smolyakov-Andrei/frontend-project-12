import * as yup from 'yup'

export const getSignupSchema = t => yup.object().shape({
  username: yup.string()
    .trim()
    .required(t('signup.required'))
    .min(3, t('signup.min3'))
    .max(20, t('signup.max20')),
  password: yup.string()
    .trim()
    .required(t('signup.required'))
    .min(6, t('signup.min6')),
  confirmPassword: yup.string()
    .test('password-match', t('signup.passwordsMustMatch'), function (value) {
      return this.parent.password === value
    }),
})

export const getChannelSchema = (channelNames, t) => yup.object().shape({
  name: yup.string().trim()
    .required(t('modals.required'))
    .min(3, t('signup.min3'))
    .max(20, t('signup.max20'))
    .notOneOf(channelNames, t('modals.unique')),
})
