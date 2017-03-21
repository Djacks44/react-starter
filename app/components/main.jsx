import React, {Component} from 'react'
import axios from 'axios'
import Container1 from './container1.jsx'
import Container2 from './container2.jsx'
import Container3 from './container3.jsx'
  var twitter = require('twitter')
class Main extends React.Component {
    constructor(props) {
    super(props);

    this.state = {
      search1:[],
      search2:[],
      search3:[],
      n:5,
      watch1:'',
      watch2:'',
      watch3:'',
      loggedin: false
    }
  }
//c
  componentDidMount() {
    axios.get('/users/userlogedin')
         .then(req => this.setState({ loggedin: req.data.logged_in}));
  }
  logout(event){

    axios.get('/sign-out').then(function (data) {
     console.log('out');
    });

    // this.setState({ loggedin: false})
  }
  handleClick(event){
    event.preventDefault();
   var a = this.refs.lol.value.trim();
   var b = '#'+a
   console.log(b)
   
   var text = {'text':a}

   axios.post('/api', text).then(function (data) {
     console.log('saved successfully');
    });


  if (this.state.search1 == 0) {
   axios.get("/tweets")
     .then(response => this.setState({search1: response}, console.log(this.state.search1)))
     localStorage.setItem("hash1", b);
     this.setState({ watch1: b})
  }else if (this.state.search1 !== 0 && this.state.search2 == 0) {
    axios.get("/tweets")
     .then(response => this.setState({search2: response}, console.log(this.state.search2)))
     localStorage.setItem("hash2", b);
     this.setState({ watch2: b})
  }else if (this.state.search1 !== 0 && this.state.search2 !== 0 && this.state.search3 == 0 ) {
    axios.get("/tweets")
     .then(response => this.setState({search3: response}, console.log(this.state.search3)))
     localStorage.setItem("hash3", b);
     this.setState({ watch3: b})
  }

}

  valClick(event){
    event.preventDefault();
    var num = parseInt(this.refs.mol.value.trim())
    


    if (num > 25) {
      num = 25
      console.log(num)
      this.setState({ n: num})
      localStorage.setItem("Num", num);
    }else if(num == 0){
      num = 5
      console.log(num)
      this.setState({ n: num})
      localStorage.setItem("Num", num);
    }else{
      console.log(num)
      this.setState({ n: num})
      localStorage.setItem("Num", num); 
    }



}
  delClick1(event){
    event.preventDefault();
    this.setState({search1: []})
    localStorage.removeItem('hash1');
    this.setState({ watch1: ''})

}

  delClick2(event){
    event.preventDefault();
    this.setState({search2: []})
    localStorage.removeItem('hash2');
    this.setState({ watch2: ''})

}

  delClick3(event){
    event.preventDefault();
    this.setState({search3: []})
    localStorage.removeItem('hash3');
    this.setState({ watch3: ''})

}
  delClickAll(event){
    event.preventDefault();
    this.setState({search1: []})
    this.setState({search2: []})
    this.setState({search3: []})
    localStorage.removeItem('hash1');
    localStorage.removeItem('hash2');
    localStorage.removeItem('hash3');
    this.setState({ watch1: ''})
    this.setState({ watch2: ''})
    this.setState({ watch3: ''})

}

  render(){

    if (this.state.loggedin) {
         return(
          <div>
             <header id="header">
              <nav className="wow fadeInDown">
               <div className="row">
                 <div className="large-3 medium-12 small-12 columns">
                   <img src='assets/img/lOGOHERE.png' className="ddd"/>
                 </div>
                 <div className="large-9 medium-12 small-12 columns">
                   <span id="showmobilemenu" className="hide-for-large-up">Menu</span>
                   <ul id="mainnav">
                    <li><a href="/" className="active">Home</a></li>
                    <li role="presentation"><a href="/" className="whtText" onClick={this.logout.bind(this)} >Log out</a></li>
                   </ul>
                 </div>
               </div>
              </nav>
              <section id="header-content">
                <h1 id="big" className="wow fadeInDown img-responsive logo">Twitter Watchlist</h1>
                 <div>
                   <form onSubmit={this.handleClick.bind(this)}>
                     <input id="bti" type="text" ref="lol" placeholder="Enter a Hashtag" />
                     <button id="bt" onClick={this.handleClick.bind(this)}>Submit</button>
                   </form>
                  </div>
             <br />
             <h6 className="big fontsans">Helping You Watch for Twitter Hashtags</h6>

             </section>
            </header>


            <div className="option-bar">
              <div className="container-fluid">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand">Options</a>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

                  <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Delete<span className="caret"></span></a>
                      <ul className="dropdown-menu">
                        <li><a onClick={this.delClick1.bind(this)}>Delete Watchlist 1</a></li>
                        <li><a onClick={this.delClick2.bind(this)}>Delete Watchlist 2</a></li>
                        <li><a onClick={this.delClick3.bind(this)}>Delete Watchlist 3</a></li>
                        <li role="separator" className="divider"></li>
                        <li><a onClick={this.delClickAll.bind(this)}>Delete All Watchlists</a></li>
                      </ul>
                    </li>
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">History<span className="caret"></span></a>
                      <ul className="dropdown-menu">
                        <li><a href="javascript:void(0)">{localStorage.getItem("hash1")}</a></li>
                        <li><a href="javascript:void(0)">{localStorage.getItem("hash2")}</a></li>
                        <li><a href="javascript:void(0)">{localStorage.getItem("hash3")}</a></li>
                        <li role="separator" className="divider"></li>
                        <li><a href="javascript:void(0)">Most Recent Watchlists</a></li>
                        <li role="separator" className="divider"></li>
                        <li><a href="javascript:void(0)">Last Custom # of Results Displayed {localStorage.getItem("Num")}</a></li>
                      </ul>
                    </li>
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Tools<span className="caret"></span></a>
                      <ul className="dropdown-menu">
                        <li><a href="javascript:void(0)">Number of results</a></li>
                      <li role="separator" className="divider"></li>
                      <li><a href="javascript:void(0)">Enter a value between 1 - 25</a></li>
                        <div className="radios">
                        <div>
                         <form onSubmit={this.valClick.bind(this)}>
                           <input id="bto" ref="mol" type="number" name="quantity" min="1" max="25"/>
                           <button id="bt" onClick={this.valClick.bind(this)}>Submit</button>
                         </form>
                        </div>
                        </div>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="watchlistcon col-md-12">
            <div className="col-md-4 wc">
              <h6 className="cush6">Watchlist One</h6>
              <p><strong className="cusst">{this.state.watch1}</strong></p>
            </div>
            <div className="col-md-4 wc m">
                <h6 className="cush6">Watchlist Two</h6>
              <p><strong className="cusst">{this.state.watch2}</strong></p>
            </div>
            <div className="col-md-4 wc">
              <h6 className="cush6">Watchlist Three</h6>
              <p><strong className="cusst">{this.state.watch3}</strong></p>
            </div>
            </div>

            <div>
             <Container1 recipe={this.state.search1} cas={this.state.n} />
            </div>
            <div>
             <Container2 recipe={this.state.search2} cas={this.state.n} />
            </div>
            <div>
             <Container3 recipe={this.state.search3} cas={this.state.n} />
            </div>
          </div>
        )}else{
      return(
        <div>
             <header id="header">
              <nav className="wow fadeInDown">
               <div className="row">
                 <div className="large-3 medium-12 small-12 columns">
                   <img src='assets/img/lOGOHERE.png' className="ddd"/>
                 </div>
                 <div className="large-9 medium-12 small-12 columns">
                   <span id="showmobilemenu" className="hide-for-large-up">Menu</span>
                   <ul id="mainnav">
                    <li><a href="/" className="active">Home</a></li>
                    <li role="presentation"><a href="#" data-toggle="modal" data-target="#sign-in" className="whtText">Login</a></li>
                   </ul>
                 </div>
               </div>
              </nav>
              <section id="header-content">
                <h1 id="big" className="wow fadeInDown img-responsive logo">Twitter Watchlist</h1>
                 <div>
                   <form onSubmit={this.handleClick.bind(this)}>
                     <input id="bti" type="text" ref="lol" placeholder="Enter a Hashtag" />
                     <button id="bt" onClick={this.handleClick.bind(this)}>Submit</button>
                   </form>
                  </div>
             <br />
             <h6 className="big fontsans">Helping You Watch for Twitter Hashtags</h6>

             </section>
            </header>

            <div className="option-bar">
              <div className="container-fluid">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand">Options</a>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

                  <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Delete<span className="caret"></span></a>
                      <ul className="dropdown-menu">
                        <li><a onClick={this.delClick1.bind(this)}>Delete Watchlist 1</a></li>
                        <li><a onClick={this.delClick2.bind(this)}>Delete Watchlist 2</a></li>
                        <li><a onClick={this.delClick3.bind(this)}>Delete Watchlist 3</a></li>
                        <li role="separator" className="divider"></li>
                        <li><a onClick={this.delClickAll.bind(this)}>Delete All Watchlists</a></li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="watchlistcon col-md-12">
            <div className="col-md-4 wc">
              <h6 className="cush6">Watchlist One</h6>
              <p><strong className="cusst">{this.state.watch1}</strong></p>
            </div>
            <div className="col-md-4 wc m">
                <h6 className="cush6">Watchlist Two</h6>
              <p><strong className="cusst">{this.state.watch2}</strong></p>
            </div>
            <div className="col-md-4 wc">
              <h6 className="cush6">Watchlist Three</h6>
              <p><strong className="cusst">{this.state.watch3}</strong></p>
            </div>
            </div>


            <div>
             <Container1 recipe={this.state.search1} cas={this.state.n} />
            </div>
            <div>
             <Container2 recipe={this.state.search2} cas={this.state.n} />
            </div>
            <div>
             <Container3 recipe={this.state.search3} cas={this.state.n} />
            </div>

 </div>

      );
    }
    }
  }


export default Main
