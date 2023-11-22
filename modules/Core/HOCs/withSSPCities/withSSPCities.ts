import { isEmptyObj } from 'Core/utils/isEmptyObj'
import { cleanUrl } from 'settings/i18n'
import { setContentLanguageHeader } from 'Core/api/config'
import { i18n } from 'next-i18next'
import { defaultCity } from '../../constants'

export const withSSPCities = (gssp?: Function) => async (ctx) => {
  const cities = []
  const { url: cityName, locale } = cleanUrl(ctx?.locale ?? defaultCity.slug)

  const currentCity =
    cities?.find(({ slug }) => slug === cityName) ?? defaultCity

  const initialState = {
    core: { cities: [], currentCity: currentCity || {}, locale },
  }
  const initialData =
    !currentCity || isEmptyObj(currentCity)
      ? {
          notFound: true,
        }
      : {}

  if (ctx.resolvedUrl !== undefined) {
    setContentLanguageHeader(i18n?.t('common:contentLanguage', { lng: locale }))
  }

  if (gssp) {
    const gsspResultData = await gssp({ ...ctx, initialState })
    return {
      ...gsspResultData,
      ...initialData,
      props: {
        ...gsspResultData.props,
        initialState: {
          ...gsspResultData.props.initialState,
        },
      },
    }
  }

  return { props: { initialState }, ...initialData }
}
