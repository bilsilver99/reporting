import React, { useState,useEffect,Component} from 'react';
import './profile.scss';
import Form from 'devextreme-react/form';
import { fetchcompany } from '../../api/MyOwnServices';
//import { fetchcompany } from '../../api/MyOwnServices';
//import { useAuth } from '../../contexts/auth';

export default function Profile() {

  const [mounted,setmounted]=useState(true)

  const [notes, setNotes ] = useState('Company Notes');

  const companynumber=1;

  const [companyValues, setvalues]=useState(null)


  

//setcompany(1);

   useEffect(() => {
      fetchcompany(companynumber).then(result =>{
            console.log(result);
            setvalues({
              YourCompanyId: 0,
              CompanyName: result.CompanyName,
              AddressLineOne: result.AddressLineOne,
              AddressLineTwo: result.AddressLineTwo,
              AddressLineThree: result.AddressLineThree,
              AddressLineFour: '',
              Country: '',
              PhoneNumber: '',
              Notes: '',
              EmailAddress: '',
            })
        })

  },[companynumber])




  return (
    <React.Fragment>
      <h2 className={'content-block'}>Company Information</h2>

      <div className={'content-block dx-card responsive-paddings'}>

        <span>{notes}</span>
      </div>

      <div className={'content-block dx-card responsive-paddings'}>
        {companyValues !== null && (
        <Form
          id={'form'}
          defaultFormData={companyValues}
          onFieldDataChanged={e => e.dataField === 'Notes' && setNotes(e.value)}
          labelLocation={'top'}
          colCountByScreen={colCountByScreen}
        />)}
      </div>

    </React.Fragment>
  );
}

const colCountByScreen = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4
};
