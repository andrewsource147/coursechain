import Link from 'next/link';

const Header = () => (
  <div className={"home-header"}>
    <div className={"home-logo"}>
      <Link href="/">
        <img src="/static/logo1.svg" alt="CourseChain" className={"home-logo-img"}/>
      </Link>
    </div>
    <div>
      <img className={"social-logo"} src={"/static/header-social.svg"}/>
    </div>
    <div className={"sign-in"}>
      <div className={"search"}/>
      <div className={"text"}>
        <Link href="/courses">
          <a>Courses</a>
        </Link>
      </div>
      <div className={"text"}>Sign in</div>
    </div>
  </div>
)

export default Header
