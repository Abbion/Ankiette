import React, {Component} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class TestApiConnection extends Component {

  handleSubmit = event => {
      event.preventDefault()
      this.test()
  }

  test() {
      fetch('http://localhost:8080/test', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      }).then(function(response) {
          if (response.status === 200) {
              console.log('connected')
          } else {
              console.log('not conected')
          }
      })
  }

  render() {
    return <div className="Register" size="lg">
        <Form onSubmit = { this.handleSubmit }>
            <Button size="lg" type="submit">Test API Connection</Button>
        </Form>
    </div>
  };
}

export default TestApiConnection;
