import { h, Fragment } from 'preact'
import { useState } from 'preact/hooks'

import { OidcConnector } from './OidcConnector.jsx'
import { Navigation } from './Navigation.jsx'
import { Token } from './Token.jsx'
import { Settings, getInitialSettings } from './Settings.jsx'

export const App = () => {
  const [options, setOptions] = useState(getInitialSettings())
  const [info, setInfo] = useState()
  const [isError, setIsError] = useState(false)

  const dispatch = (objOrErr) => {
    const isError = objOrErr instanceof Error
    setIsError(isError)
    setInfo(isError ? objOrErr.message : objOrErr)
    if (isError) console.error(objOrErr)
  }

  return (
    <Fragment>
      <OidcConnector options={options}>
        <Navigation dispatch={dispatch} />
        {info
          ? <pre className={isError ? 'error' : ''}>
            {JSON.stringify(info, null, 2)}
          </pre>
          : null
        }
        <Token />
      </OidcConnector>
      <details>
        <summary>Settings</summary>
        <Settings handleSave={setOptions} />
      </details>
    </Fragment>
  )
}
