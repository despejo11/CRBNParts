import WhoWeAre from './components/WhoWeAre/WhoWeAre'
import MostPopular from './components/MostPopular/MostPopular'
import SubscribeLink from '../SubscribeLink/SubscribeLink'
import MadeIn from './components/MadeIn/MadeIn'

export default function HomeContent() {
  return (
    <>
      <WhoWeAre />
      <MostPopular />
      <SubscribeLink />
      <MadeIn />
    </>
  )
}
