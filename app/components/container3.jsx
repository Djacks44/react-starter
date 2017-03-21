import React, {Component} from 'react'
import axios from 'axios'
import Router from 'react-router'
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';



class Container3 extends React.Component {
    constructor(props) {
    super(props);
    this.state = {

    };
    // console.log(this.props, 'lol')


  }


  render(){
    // console.log(this.props,'dklmxdslmkxdsmx')

    if (this.props.recipe == '') {
         return(
          <div>
        <section className="content-padding recipes">

      </section>
    </div>
  );

    }else{
      // console.log(this.props.recipe == '')
      // console.log(this.props.recipe)
      var recipe = this.props.recipe


      let n = 2
      
      if (this.props.cas == undefined) {
         n = 5
      }else{
         n = this.props.cas
      }
      var limitnum = this.props.recipe.data.slice(0, n);

      var recipes = limitnum.map(function(recipe, index){

    return(
    <div>
    <div key={index}>
    <div className="row">
        
            <div className="card col-md-12">
                <div className="col-md-12">
                    <img className="img1" src={recipe.img} alt="" />
                    <p className="yo">{recipe.username}</p>
                    <p className="yo">{recipe.screen_name}</p>
                </div>
                <div className="col-md-12">
                    <p className="text">{recipe.text}</p>
                </div>
                
            </div>
       
    </div>

    </div>
    </div>

  );
    }.bind(this))


if(this.state.reciped == undefined){

       return(
      <div>
        <section className="content-padding recipes">
        <div className="row">
          <div className="large-12 medium-12 small-12 columns text-center">
            <div className="head align-center">
              <h2 className="margin0">Twitter Watchlist Three</h2>
              
            </div>
          </div>
        </div>

        <div className="wow bounceInUp" data-wow-offset="250">
          <div className="row" data-equalizer>
            {recipes}
          </div>
        </div>
      </section>
    </div>

        );
     }else{
      return(
      <div>
        <section className="content-padding recipes">
        <div className="row">
          <div className="large-12 medium-12 small-12 columns text-center">
            <div className="head align-center">
              <h2 className="margin0"> Twitter Watchlist Three</h2>
              
            </div>
          </div>
        </div>

        <div className="wow bounceInUp" data-wow-offset="250">
          <div className="row" data-equalizer>
            {recipes}
             <Example recipe={this.state.reciped} />
          </div>
        </div>
      </section>
    </div>

        );


     }


  }


  }

}

export default Container3