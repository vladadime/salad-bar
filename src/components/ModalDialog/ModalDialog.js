import { useContext, useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { AddNewIngredientForm, EditIngredientForm } from '../Form';
import Context from '../../contexts/ContextProvider';

const ModalDialog = ({isOpen, onClose, modalContent}) => {
  const {addIngredient, editIngredient, deleteIngredient} = useContext(Context);
  const [title, setTitle] = useState("");
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientImage, setIngredientImage] = useState("");
  const [ingredientCalories, setIngredientCalories] = useState(0);
  const [ingredientTag, setIngredientTag] = useState("");
  useEffect(() => {

    const getTitle = async() => {
    if(modalContent) {
      if(modalContent.type === "addIngredient") {
        setTitle("Add ingredient");
      } else if(modalContent.type === "editIngredient") {
        setTitle("Edit ingredient");
        setIngredientName(modalContent.data.name);
        setIngredientImage(modalContent.data.image);
        setIngredientCalories(modalContent.data.calories);
        setIngredientTag(modalContent.data.tag);
      } else if(modalContent.type === "deleteIngredient") {
        setTitle("Delete ingredient");
      }
    }
  }
  getTitle();
  }, [modalContent]);

  const getContent = () => {
    if(modalContent) {
      if(modalContent.type === "addIngredient") {
        return <AddNewIngredientForm handleFormSubmit={handleFormSubmit} handleFormChange={handleFormChange} />;
      } else if(modalContent.type === "editIngredient") {
        return <EditIngredientForm ingredient={modalContent.data} handleFormSubmit={handleFormSubmit} handleFormChange={handleFormChange} />;
      } else if(modalContent.type === "deleteIngredient") {
        return `Do you want delete ${modalContent.data.name}?`;
      }
    }
  };

  const handleFormChange = (e) => {
    if(e.id === "name") {
      setIngredientName(e.value);
    } else if(e.id === "image") {
      setIngredientImage(e.value);
    } else if(e.id === "calories") {
      setIngredientCalories(e.value);
    } else if(e.id === "tag") {
      setIngredientTag(e.value);
    }
  };

  const handleFormSubmit = () => {
    if(modalContent.type === "deleteIngredient") {
      deleteIngredient(modalContent.data.id);
    } else {
      const ingredient = {
        "name": ingredientName,
        "image": ingredientImage,
        "calories": ingredientCalories,
        "tag": ingredientTag,
      };
      console.log(ingredient);

      if(!ingredientName || !ingredientCalories) {
        // throw new Error("You must to fill this fields");
        console.log("You must to fill this fields");
      }

      if(modalContent.type === "addIngredient") {
        addIngredient(ingredient);
      } else if(modalContent.type === "editIngredient") {
        ingredient.id = modalContent.data.id;
        ingredient.createdAt = modalContent.data.createdAt;
        editIngredient(ingredient);
      }

      resetFormValues();
    }

  };

  const resetFormValues = () => {
    setIngredientName("");
    setIngredientImage("");
    setIngredientCalories(0);
    setIngredientTag("");
  };

  return (
    <>
      <Modal show={isOpen}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {getContent()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={() => { handleFormSubmit(); onClose(false); }}>
            {modalContent && modalContent.type === "deleteIngredient" ? "Delete" : "Save"}
          </Button>
          <Button variant="danger" onClick={() => onClose(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
};

export default ModalDialog;