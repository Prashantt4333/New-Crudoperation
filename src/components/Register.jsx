import  { useState } from "react";

export default function Register() {
  const [tableList, setTableList] = useState([]);
  const [formData, setFormData] = useState({});
  const [editingIndex, setEditingIndex] = useState(null); 
  const roles = ["Admin", "User", "guest"];

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
  }
  console.log("PPPformdata--->",formData)

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!formData.name) {
      validationErrors.name = 'Name is required';
    }
    if (!formData.email) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'Invalid email address';
    }
    if (!formData.password) {
      validationErrors.password = 'Password is required';
    }

    if (Object.keys(validationErrors).length === 0) {
      
      console.log('Form submitted: ---->', formData);
    } else {
     
      setErrors(validationErrors);
    }

    if (editingIndex !== null) {
      
      setTableList((prev) => {
        const newList = [...prev];
        newList[editingIndex] = formData;
        return newList;
      });
      setEditingIndex(null); 
    }
      else {
      if(!isEmptyObject(formData)){
        setTableList((prev) => [...prev, formData]);
      }
    }
    setFormData({}); 
    
  //  validation Errrprrr

  };


  const handleEdit = (item,index) => {
    setFormData(item); 
    setEditingIndex(index); 
  };

  const handleDelete = (index) => {
    setTableList((prev) => prev.filter((_, i) => i !== index)); 
    if (index === editingIndex) {
      setEditingIndex(null); 
    }
  };

  console.log("PPPTableList-->", tableList);
  return (
    <>
      <h1 className="text-center mt-3"> Registration Form</h1>
      <form className=" my-form">     
        <div className=" mt-2">
          <label>First Name:</label>
          <input
            className="form-control"
            type="text"
            
            name="firstName"
            value={formData?.firstName || ''}
            onChange={(e) =>handleChange(e)}
          />
          {errors.name && <span>{errors.name}</span>}
        </div>
        <div>
          <label>Last Name:</label>
          <input
            className="form-control"
            type="text"
            name="lastName"
            value={formData?.lastName || ''}
            onChange={(e) =>handleChange(e)}
          />
           {errors.name && <span>{errors.name}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input
            className="form-control"
            type="email"
            name="email"
            value={formData?.email || ''}
            onChange={(e) =>handleChange(e)}
          />
           {errors.email && <span>{errors.email}</span>}
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            className="form-control"
            type="number"
            name="number"
            value={formData?.number || ''}
            onChange={(e) =>handleChange(e)}
          />
          {errors.password && <span>{errors.password}</span>}
        </div>
        <div>
          <label>Password:</label>
          <input
            className="form-control "
            type="text"
            name="password"
            value={formData?.password || ''}
            onChange={(e) =>handleChange(e)}
          />
        </div>
        <div>
          <label className="m-2">Role:</label>
          <select
            name="role"
            value={formData?.role || ''}
            onChange={(e) => handleChange(e)}
          >
            <option value="">Select a role</option>
            {roles.map((role, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
       
        <button
          className="btn btn-primary mt-5 w-100 mb-5"
          onClick={handleSubmit}
          type="button"
        >
          {editingIndex !== null ? "Update" : "Submit"} 
        </button>
      </form>
      
      {/* Table */}
      <table className="table mt-5">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Email</th>
            <th scope="col">Number</th>
            <th scope="col">passWord</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th> 
          </tr>
        </thead>
        <tbody>
          {tableList.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.number}</td>
              <td>{item.password}</td>
              <td>{item.role}</td>
              <td>
                
                <button className="btn btn-primary" onClick={() => handleEdit(item,index)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
