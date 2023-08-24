import React, { useEffect, useState } from 'react'
import './Home.css'
import { addMyContact, deleteContact, getAllContacts, searchContact, updateMyContact } from '../../Api';
import Modal from '../Modal/Modal';

function Home() {

    const [phoneNumbers, setPhoneNumbers] = useState(['']);
    const [phoneNumbersUpdated, setPhoneNumbersUpdated] = useState(['']);
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState("");
    const [nameUpdated, setNameUpdated] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalName, setModalName] = useState();
    const [modalId, setModalId] = useState();
    const [modalPhone, setModalPhone] = useState([]);
    const [deletes, setDeletes] = useState(false);

    const openModal = (id, name, numbers) => {
        setModalName(name)
        console.log(id);
        setModalPhone(numbers)
        setModalId(id);
        setModalOpen(true);
        setNameUpdated(name);
        setPhoneNumbersUpdated(numbers)
    };

    const closeModal = () => {
        setModalOpen(false);
    };


    const handleAddPhoneNumber = () => {
        setPhoneNumbers([...phoneNumbers, '']);
    };

    const handlePhoneNumberChange = (e, index) => {
        const updatedPhoneNumbers = [...phoneNumbers];
        updatedPhoneNumbers[index] = e.target.value;
        setPhoneNumbers(updatedPhoneNumbers);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleUpdatedNameChange = (e) => {
        setNameUpdated(e.target.value);
    }


    const handleUpdatedPhoneNumberChange = (e, index) => {
        const updatedPhoneNumbers = [...phoneNumbersUpdated];
        updatedPhoneNumbers[index] = e.target.value;
        setPhoneNumbersUpdated(updatedPhoneNumbers);
    };


    const addContact = async () => {
        const contData = {
            "name": name,
            "phoneNumbers": phoneNumbers
        }

        const { data } = await addMyContact(contData);

        if (data.status == 'ok') {
            setDeletes(!deletes);
            document.getElementById("success-box").innerHTML = "Successfully Added"
            setTimeout(() => {

                document.getElementById("success-box").innerHTML = ""
            }, 4000);
        } else {
            document.getElementById("fail-box").innerHTML = "Something Went Wrong"
            setTimeout(() => {

                document.getElementById("fail-box").innerHTML = ""
            }, 4000);
        }
    }

    const updateContact = async () => {

        const contData = {
            "name": nameUpdated,
            "phoneNumbers": phoneNumbersUpdated
        }

        console.log(phoneNumbersUpdated);

        const { data } = await updateMyContact(contData, modalId);

        if (data.status == 'ok') {
            setDeletes(!deletes);
            closeModal();
        }
    }

    const getContacts = async () => {
        const { data } = await getAllContacts();
        setContacts(data.contacts)
    }

    const handleDelete = async (e, id) => {
        const { data } = await deleteContact(id);

        if (data.status == 'ok') {
            setDeletes(!deletes);
            document.getElementById("success-box").innerHTML = data.message
            setTimeout(() => {

                document.getElementById("success-box").innerHTML = ""
            }, 4000);
        }

    }


    const handleSearch = async(e) =>{

        const {data} = await searchContact(e.target.value);
        console.log(data);
        setContacts(data.contacts);
    }


    useEffect(() => {

            getContacts();
        
    }, [deletes])


    return (

        <div class="mycontainer">
            <h1>Contact App</h1>
            <div class="add-contact-form">
                <input type="text" id="name" placeholder="Name" onChange={(e) => handleNameChange(e)} />

                    {phoneNumbers.map((phoneNumber, index) => (
                        <input
                            key={index}
                            type="tel"
                            placeholder="Phone"
                            value={phoneNumber}
                            onChange={(e) => handlePhoneNumberChange(e, index)}
                        />
                    ))}
                    
                    

                <button id="add-phone-btn" onClick={handleAddPhoneNumber}>+ Add Phone Number</button>

                
                <button id="add-contact-btn" onClick={addContact}>Add Contact</button>
                <div id="success-box"></div>
                <div id="fail-box"></div>
            </div>

            <div className="search-container">
                <input type="text" className="search-input" placeholder="Search..." onChange={(e) => handleSearch(e)}/>
            </div>
            <div className="contact-list">
                <h2>Contact List</h2>
                <ul>

                    
                    { contacts.map((contact) => (
                        <li key={contact._id} className="contact-item">
                            <h3>{contact.name}</h3>
                            <ul className="phone-numbers">
                                {contact.phoneNumbers.map((phoneNumber, index) => (
                                    <li key={index}>{phoneNumber}</li>
                                ))}
                            </ul>
                            <button onClick={(e) => handleDelete(e, contact._id)}>Delete</button> |

                            <button onClick={(e) => openModal(contact._id, contact.name, contact.phoneNumbers)}>Update</button>
                        </li>
                    ))}
                </ul>
            </div>

            <Modal isOpen={modalOpen} onClose={closeModal}>

                <div class="add-contact-form">
                    <input type="text" id="name" placeholder="Name" defaultValue={modalName} onChange={(e) => handleUpdatedNameChange(e)} />

                    <div id="phone-inputs">
                        {modalPhone.map((phoneNumber, index) => (
                            <input
                                key={index}
                                type="tel"
                                placeholder="Phone"
                                defaultValue={phoneNumber}
                                onChange={(e) => handleUpdatedPhoneNumberChange(e, index)}
                            />
                        ))}
                    </div>

                    <button id="add-contact-btn" onClick={updateContact}>Update Contact</button>
                    <div id="success-box"></div>
                    <div id="fail-box"></div>
                </div>

            </Modal>

        </div>

    )
}

export default Home