import Navigation from './Navigation';
import Footer from './Footer';

const Layout = (props) => {
return(
  <div>
    <Navigation />
    <main>{props.children}</main>
    <Footer />
  </div>
)
}

export default Layout;