import Header from './Header';
import Footer from './Footer';

const BasicLayout = (props) => {
  return (
    <>
      <Header />
      <div>
        {props.children}
      </div>
      <Footer />
    </>
  )
}

export default BasicLayout