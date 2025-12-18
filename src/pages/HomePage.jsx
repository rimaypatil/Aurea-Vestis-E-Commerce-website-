import Hero from '../components/Hero'
import TrustBanner from '../components/TrustBanner'
import MarqueeSection from '../components/MarqueeSection'
import Collections from '../components/Collections'
import TheAureaEdit from '../components/TheAureaEdit'
import WhyUs from '../components/WhyUs'
import Deals from '../components/Deals'
import JoinClub from '../components/JoinClub'
import Newsletter from '../components/Newsletter'

export default function HomePage() {
    return (
        <>
            <Hero />
            <TrustBanner />
            <MarqueeSection />
            <Collections />
            <TheAureaEdit />
            <WhyUs />
            <Deals />
            <JoinClub />
            <Newsletter />
        </>
    )
}
