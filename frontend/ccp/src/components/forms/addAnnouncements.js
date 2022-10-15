import React, {useState,setState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import './style.css'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function AddCompany() {
    
    const [companyName,setCompanyName] = useState(null);
    const [cgpaCriteria,setCGPACriteria] = useState(null);
    const [eligibleDepartments,setEligibleDepartments] = useState(null);
    const [discription,setDiscription] = useState(null); 
    const options = ['CSE', 'EEE', 'ECE', 'Civil', 'Mech', 'Chem', 'ICE', 'MME', 'Prod']

    const handleInputChange = (e) => {
        const {id,value} = e.target;
        if(id === "companyName"){
            setCompanyName(value);
        }
        if(id === "cgpaCriteria"){
            setCGPACriteria(value);
        }
        if(id === "eligibleDepartments"){
            setEligibleDepartments(value);
        }
        if(id === "discription"){
            setDiscription(value);
        } 

    }

    const handleSubmit  = () => {
        console.log(companyName,cgpaCriteria,eligibleDepartments,discription);
    }

    return(
        <div className="form">
            <div className="form-body">
                <div className="username">
                    <label className="form__label" for="companyName">Company Name </label>
                    <input className="form__input" type="text" value={companyName} onChange = {(e) => handleInputChange(e)} id="companyName" placeholder="Company Name"/>
                </div>
                <div className="cgpaCriteria">
                    <label className="form__label" for="cgpaCriteria">CGPA Criteria </label>
                    <input  type="text" name="" id="cgpaCriteria" value={cgpaCriteria}  className="form__input" onChange = {(e) => handleInputChange(e)} placeholder="CGPA Criteria"/>
                </div>
                <div className="eligibledepartments">
                    <label className="form__label" for="eligibledepartments">Eligible Departments</label>
                    <Autocomplete style={{width:190,display:'inline-block'}}
                        multiple
                        id="checkboxes-tags-demo"
                        options={options}
                        renderOption={(option, { selected }) => (
                        <React.Fragment>
                            <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            checked={selected}
                            />
                            {option}
                        </React.Fragment>
                        )}
                        // style={{ width: 500 }}
                        renderInput={(params) => (
                        <TextField {...params} variant="outlined"
                            label="Dept List"
                            placeholder="Branches "
                            className="form__input"
                             />
                        )}
                    />
                </div>

                <div className="discription">
                    <label className="form__label" for="discription">Discription Link </label>
                    <input className="form__input" type="textarea"  id="discription" value={discription} onChange = {(e) => handleInputChange(e)} placeholder="Discription Link"/>
                </div> 
            </div>
            <div class="footer">
                <button onClick={()=>handleSubmit()} type="submit" class="btn bg-primary">AddCompany</button>
            </div>
        </div> 
    )       
}

export default AddCompany