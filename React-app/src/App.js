import React from "react";
import axios from "axios";
import deleteIcon from '/assets/delete_icon.png';

class App extends React.Component {
  state = {
    response: {}
  };

  constructor(props) {
    super(props);
    this.bookNameRef = React.createRef();
  }

  async componentDidMount() {
    await this.initUserList();
    const response = await this.fetchUserList();
    this.setState({response})
  }

  initUserList = () => {
    return axios.post("/api/user/init")
      .catch(error => {
        throw error;
      })
      .then(response => {
        return response.data;
      });
  };

  fetchUserList = () => {
    return axios.post("/api/user/list")
      .catch(error => {
        throw error;
      })
      .then(response => {
        return response.data;
      });
  };

  handleSubmit = () => {
    const bookName = this.bookNameRef.current.value;
    this.bookNameRef.current.value = '';
    axios.post("/api/user/book/add", {bookName})
      .catch(error => {
        throw error;
      })
      .then(async () => {
        const response = await this.fetchUserList();
        this.setState({response})
      });
  };

  handleDelete = (userId, userBookId) => () => {
    const data = {userId, userBookId};
    axios.post("/api/user/book/delete", data)
      .catch(error => {
        throw error;
      })
      .then(async () => {
        const response = await this.fetchUserList();
        this.setState({response})
      });
  };

  render() {
    const {response} = this.state;
    if (!response.user) {
      return <div>Response not returned.</div>;
    }
    return (
      <>
        <h1>Welcome to React Parcel Micro App!</h1>
        <h2>Hard to get more minimal than this React app.</h2>
        <br/>

        <hr/>

        <p>Minimal CRUD Example.</p>
        <h3>First API access returned :</h3>
        <textarea style={{width: 640}} rows={6} value={JSON.stringify(response)} readOnly/>

        <h3>Formatted and Delete button :</h3>
        <div>
          <span>{response.user.userName}さんの本棚</span>
          <ul>{response.user.userBooks.map((userBook, idx) => (
            <li key={idx}>
              {userBook.bookName}
              <a onClick={this.handleDelete(response.user.id, userBook.id)} href='javascript:'>
                <img alt='delete' src={deleteIcon} width={26} style={{verticalAlign: 'bottom'}}/>
              </a>
            </li>))}
          </ul>
        </div>

        <h3>Adding book by Form :</h3>

        <form action='javascript:' onSubmit={this.handleSubmit}>
          <input ref={this.bookNameRef} name='bookName'/>
          <input type='submit'/>
        </form>

      </>
    );
  }
}

export default App;