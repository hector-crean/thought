import { Route, Switch } from 'wouter'
import { MainLayout } from './layouts/MainLayout'

import FramePage from '@/routes/frame/page'


const App = () => {

  /* 
     Routes below are matched exclusively -
     the first matched route gets rendered
   */
  return (


    <MainLayout
      sidebarNode={<></>}
      mainOverlay={<></>}
      mainNodes={
        <Switch>
          <Route path="/users/:name">
            {(params) => <>Hello, {params.name}!</>}
          </Route>
          <Route path="/frame" component={FramePage} />

          {/* Default route in a switch */}
          <Route>404: No such page!</Route>
        </Switch>
      } />
  )
}

export default App
