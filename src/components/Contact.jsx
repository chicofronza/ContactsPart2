import React from 'react';
import moment from 'moment'

class Contact extends React.Component {
  render() {
    // const {data} = this.props
    const data = Array.isArray(this.props.data) ? this.props.data : [Object.keys(this.props.data).map(key => (this.props.data[key]))]
    return (
      <>
        {data.map((item, index) => (
          <article className="contact" key={item.id} data-testid="contact">
            <span className="contact__avatar">
              <img src={item.avatar} alt="Avatar do Contato"/>
            </span>
            <span className="contact__data">{item.name}</span>
            <span className="contact__data">{item.phone}</span>
            <span className="contact__data">{item.country}</span>
            <span className="contact__data">{moment(item.admissionDate).format("DD/MM/YYYY")}</span>
            <span className="contact__data">{item.company}</span>
            <span className="contact__data">{item.department}</span>
          </article>
        ))}
      </>
    );
  }
}

export default Contact;
