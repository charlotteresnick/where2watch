import React from 'react';



class LikeButton extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          likes: 0,
      }
  }
    
// componentDidMount() {
//     fetch(`/api/media/${}`)
// }
//     addLike = () {
//         fetch(`api/media/${}`, {
//          method:"POST",
//       }); 
//     };


//     deleteLike = () => {
//         fetch(`api/media/${}`, {
//            method: "DELETE",
//        });            
//     };

    handleClick = () => {
        this.setState(({ likes }) => ({
            likes: likes + 1
        }));
    };
    render() {
        return (
            <button onClick={this.Liked}>❤️{this.state.likes}</button>
        )
    }
}

export default LikeButton;