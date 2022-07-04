import logo from './logo.svg';
import './App.css';
import Person from './user-solid.png';
import Call from './Assets/Call.svg';
import Email from './Assets/Email.svg';
import Facebook from './Assets/Facebook.svg';
import Insta from './Assets/Insta.svg';
import Linkedin from './Assets/Linkedin.svg';
import Twitter from './Assets/Twitter.svg';
import Logo from './justtaplogo.jpeg';
import {useState, useEffect} from 'react';
import db from './Firebase';

function App() {
  const [selectedsection, setselectedsection] = useState("Basic");
  const queryParams = new URLSearchParams(window.location.search);
  const [term, setterm] = useState(queryParams.get("cardid"))
  const time = queryParams.get("time");
  const name = queryParams.get("name");
  const [carddata, setcarddata] = useState(null);

  useEffect(() => {
    if(term !== null) {
      db.collection('cards').doc(term).get().then(cdata => {
        setcarddata(cdata.data());
      })
    }
    else if(time !== null && name !== null) {
      const key = `time=${time}&name=${name}`;
      db.collection('qrlinks').doc(key).get().then(qdata => {
        const cardid = qdata.data().cardid;
        setterm(cardid);
        db.collection('cards').doc(cardid).get().then(cdata => {
          setcarddata(cdata.data());
        })
      })
    }
    else if(time !== null && name == null) {
      
      const key = `time=${time}`;
      db.collection('qrlinks').doc(key).get().then(qdata => {
        const cardid = qdata.data().cardid;
        setterm(cardid);
        db.collection('cards').doc(cardid).get().then(cdata => {
          setcarddata(cdata.data());
        })
      })
    }
  }, [term,time])

  const callnumber = (mobile) => {
    window.location ='tel:'+mobile;
  }
  const mailemail = (mobile) => {
    window.location ='mailto:'+mobile;
  }
  return (
    <div className="App">
      <div className="background"></div>
      <div className="foreground">
      <img src={Logo} />
      {carddata && <div>
      <div className='imgcover'>
        <img src={carddata.profileimage !== "" ? carddata.profileimage :  Person}/>
      </div>
      <h3>{carddata.name}</h3>
      <h5>{carddata.company}</h5>
      <div className="selector">
        <button className={selectedsection === "Basic" ? 'special' : 'normal'} onClick={() => setselectedsection("Basic")}>Basic</button>
        <button className={selectedsection === "Social Media" ? 'special' : 'normal'}onClick={() => setselectedsection("Social Media")}>Social Media</button>
        <button className={selectedsection === "About Me" ? 'special' : 'normal'} onClick={() => setselectedsection("About Me")}>About Me</button>
      </div>
      {selectedsection === "Basic" && 
            <div className="eachholding">
            <div className='eachitem'>
                <img src={Call} />
                {
                  carddata.mobilenumbers && carddata.mobilenumbers.map((mobile) => {
                    return <h4 style={{marginRight : 10}} onClick={() => callnumber(mobile)}>{mobile}</h4>
                  })
                }
                {/* <h4>{carddata.mobilenumbers ? carddata.mobilenumbers.join("/") : carddata.mobile}</h4> */}
            </div>
            <div className='eachitem'>
                <img src={Email} />
                {
                  carddata.emailids && carddata.emailids.map((email) => {
                    return <h4 style={{marginRight : 10}} onClick={() => mailemail(email)}>{email}</h4>
                  })
                }
            </div>
            </div>}
            {selectedsection === "Social Media" && <div className="eachholding">
            <div className='eachitem'>
                <img src={Facebook} />
                <a target="_blank" href={`https://www.facebook.com/${carddata.facebook}/`}>{carddata.facebook}</a>
            </div>
            <div className='eachitem'>
                <img src={Insta} />
                <a target="_blank" href={`https://www.instagram.com/${carddata.instagram}/`}>{carddata.instagram}</a>
            </div>
            <div className='eachitem'>
                <img src={Twitter} />
                <a target="_blank" href={`https://twitter.com/${carddata.twitter}/`}>{carddata.twitter}</a>
            </div>
            <div className='eachitem'>
                <img src={Linkedin} />
                <a target="_blank" href={`https://www.linkedin.com/in/${carddata.linkedin}/`}>{carddata.linkedin}</a>
            </div>
            </div>
            }
            {selectedsection === "About Me" && <div className="eachholding">
            <h3>About Me</h3>
            <div className='eachitem'>
                
                <h4>{carddata.about}</h4>
            </div>  
            <h3>Bio</h3>
            <div className='eachitem'>
                
                <h4>{carddata.bio}</h4>
            </div>  
            </div>
            }
            <a className="speciala" href={`https://firebasestorage.googleapis.com/v0/b/nfcapp-5495e.appspot.com/o/vcardss%2F${term !== null ? term : time}.vcf?alt=media`}>Save this contact</a>
            </div> }
          </div> 
    </div>
  );
}

export default App;
