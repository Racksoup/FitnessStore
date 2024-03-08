import React, { useState } from "react";
import "./UpdateProduct.scss";
import { updateProduct } from "../../../../Redux/productSlice";
import { selectCategories } from "../../../../Redux/categorySlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

const UpdateProduct = ({ toggleModal, currProduct }) => {
  const categories = useSelector(selectCategories);
  const [showCategories, setShowCategories] = useState(false);
  const [files, setFiles] = useState([]);
  const [product, setProduct] = useState(currProduct);
  const [newMain, setNewMain] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct(product, files, newMain));
  };

  const addInputRow = (e, objName) => {
    e.preventDefault();
    setProduct({
      ...product,
      [objName]: [...product[objName], { key: "", value: "" }],
    });
  };

  const deleteInputRow = (e, i, objName) => {
    e.preventDefault();
    setProduct({
      ...product,
      [objName]: [...product[objName].filter((d, j) => j !== i)],
    });
  };

  const keyChange = (e, i, objName) => {
    setProduct({
      ...product,
      [objName]: [
        ...product[objName].map((x, j) => {
          if (i === j) {
            let f = { key: x.key, value: x.value };
            f.key = e.target.value;
            return f;
          } else {
            return x;
          }
        }),
      ],
    });
  };

  const valueChange = (e, i, objName) => {
    setProduct({
      ...product,
      [objName]: [
        ...product[objName].map((x, j) => {
          if (i === j) {
            let f = { key: x.key, value: x.value };
            f.value = e.target.value;
            return f;
          } else {
            return x;
          }
        }),
      ],
    });
  };

  const aboutChange = (e, i) => {
    let newArr = [...product.about];
    newArr[i] = e.target.value;
    setProduct({ ...product, about: newArr });
  };

  const addAboutRow = (e) => {
    e.preventDefault();
    setProduct({ ...product, about: [...product.about, ""] });
  };

  const setMainImage = (e) => {
    setNewMain(e.target.name);

    setProduct(() => ({
      ...product,
      image_filenames: [
        ...product.image_filenames.map((x) => {
          if (x.filename === e.target.name) {
            let f = { filename: x.filename, main: !x.main };
            return f;
          } else {
            let f = { filename: x.filename, main: false };
            return f;
          }
        }),
      ],
    }));

    setFiles([
      ...files.map((x) => {
        x.main = false;
        return x;
      }),
    ]);
  };

  const setMainImageNew = (e) => {
    setNewMain(e.target.name);

    setProduct(() => ({
      ...product,
      image_filenames: [
        ...product.image_filenames.map((x) => {
          let f = { filename: x.filename, main: false };
          return f;
        }),
      ],
    }));

    setFiles([
      ...files.map((x) => {
        if (x.file.name === e.target.name) {
          let n = { main: x.main, file: x.file };
          n.main = true;
          return n;
        } else {
          let n = { main: x.main, file: x.file };
          n.main = false;
          return n;
        }
      }),
    ]);
  };

  const fileChanged = (e) => {
    e.preventDefault();
    let x = { main: false, file: e.target.files[0] };
    setFiles([...files, x]);
  };

  const removeOGImage = (item) => {
    setProduct({
      ...product,
      image_filenames: [
        ...product.image_filenames.filter((x) => x.filename !== item.filename),
      ],
    });
  };

  const removeNewImage = (item) => {
    setFiles([...files.filter((x) => x.file.name !== item.file.name)]);
  };

  return (
    <div className="UpdateProduct">
      <div className="Content" onClick={(e) => e.stopPropagation()}>
        <button className="Btn-2" onClick={() => toggleModal(false)}>
          <FontAwesomeIcon icon={faX} className="Icon" />
        </button>
        <h2 className="Title">Update Product</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="Row">
            <label>Name</label>
            <input
              className="MainInput"
              type="text"
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              value={product.name}
            />
          </div>
          <div className="Row">
            <label>Category</label>
            <div
              className="MainInput"
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
            >
              {showCategories && (
                <div className="Categories">
                  {categories.map((cat, i) => (
                    <div
                      className="Category"
                      key={i}
                      onClick={() =>
                        setProduct({
                          ...product,
                          category: cat.category,
                          categoryID: cat._id,
                        })
                      }
                    >
                      {cat.category}
                    </div>
                  ))}
                </div>
              )}
              <p className="CategoryDisplay">{product.category}</p>
            </div>
          </div>
          <div className="Row">
            <label>Price</label>
            <input
              className="MainInput"
              type="number"
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              value={product.price}
            />
          </div>
          <div className="Row">
            <label>Highlight</label>
            <div className="CheckboxHolder">
              <input
                className="Checkbox"
                type="checkbox"
                checked={product.highlight}
                onChange={() =>
                  setProduct({ ...product, highlight: !product.highlight })
                }
              />
            </div>
          </div>
          <div className="Row">
            <label>Brand</label>
            <input
              className="MainInput"
              type="text"
              onChange={(e) =>
                setProduct({ ...product, brand: e.target.value })
              }
              value={product.brand}
            />
          </div>
          <div className="Row">
            <label>Merchant</label>
            <input
              className="MainInput"
              type="text"
              onChange={(e) =>
                setProduct({ ...product, merchant: e.target.value })
              }
              value={product.merchant}
            />
          </div>
          <div className="Row">
            <label>Main Details</label>
            <button
              className="Btn-5"
              onClick={(e) => addInputRow(e, "details")}
            >
              <FontAwesomeIcon icon={faPlus} className="Icon" />
            </button>
            <div className="MultiInputWidget">
              {product.details.map((detail, i) => {
                let marginStyle = { marginBottom: "0.5rem" };
                if (i === product.details.length - 1) {
                  marginStyle.marginBottom = "0rem";
                }
                return (
                  <div className="SingleRow" style={marginStyle} key={i}>
                    <button
                      className="Btn-4"
                      onClick={(e) => deleteInputRow(e, i, "details")}
                    >
                      <FontAwesomeIcon icon={faX} className="Icon" />
                    </button>
                    <div className="Inputs">
                      <div className="InputGroup">
                        <div className="Label">Name:</div>
                        <input
                          className="KeyInput"
                          type="text"
                          onChange={(e) => keyChange(e, i, "details")}
                          value={detail.key}
                        />
                      </div>
                      <div className="InputGroup">
                        <div className="Label">Detail:</div>
                        <input
                          className="ValueInput"
                          type="text"
                          onChange={(e) => valueChange(e, i, "details")}
                          value={detail.value}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="Row">
            <label>Technical Details</label>
            <button
              className="Btn-5"
              onClick={(e) => addInputRow(e, "tech_details")}
            >
              <FontAwesomeIcon icon={faPlus} className="Icon" />
            </button>
            <div className="MultiInputWidget">
              {product.tech_details.map((tech_details, i) => {
                let marginStyle = { marginBottom: "0.5rem" };
                if (i === product.tech_details.length - 1) {
                  marginStyle.marginBottom = "0rem";
                }
                return (
                  <div className="SingleRow" style={marginStyle} key={i}>
                    <button
                      className="Btn-4"
                      onClick={(e) => deleteInputRow(e, i, "tech_details")}
                    >
                      <FontAwesomeIcon icon={faX} className="Icon" />
                    </button>
                    <div className="Inputs">
                      <div className="InputGroup">
                        <div className="Label">Name:</div>
                        <input
                          className="KeyInput"
                          type="text"
                          onChange={(e) => keyChange(e, i, "tech_details")}
                          value={tech_details.key}
                        />
                      </div>
                      <div className="InputGroup">
                        <div className="Label">Detail:</div>
                        <input
                          className="ValueInput"
                          type="text"
                          onChange={(e) => valueChange(e, i, "tech_details")}
                          value={tech_details.value}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="Row">
            <label>About</label>
            <button className="Btn-5" onClick={(e) => addAboutRow(e)}>
              <FontAwesomeIcon icon={faPlus} className="Icon" />
            </button>
            <div className="MultiInputWidget">
              {product.about.map((item, i) => {
                let marginStyle = { marginBottom: "0.5rem" };
                if (i === product.about.length - 1) {
                  marginStyle.marginBottom = "0rem";
                }

                return (
                  <div className="SingleRow" style={marginStyle} key={i}>
                    <button
                      className="Btn-4"
                      onClick={(e) => deleteInputRow(e, i, "about")}
                    >
                      <FontAwesomeIcon icon={faX} className="Icon" />
                    </button>
                    <div className="Inputs">
                      <div className="InputGroup">
                        <div className="Label">Info:</div>
                        <input
                          className="AboutInput"
                          type="text"
                          onChange={(e) => aboutChange(e, i)}
                          value={item}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <label for="upload" className="Btn">
            Upload Image
          </label>
          <input
            type="file"
            onChange={(e) => fileChanged(e)}
            id="upload"
            style={{ display: "none" }}
          />

          <div className="Row">
            <div className="ImagesRow">
              {product.image_filenames.map((item, i) => {
                return (
                  <div className="ImageBox" key={i}>
                    <div className="Top">
                      <input
                        type="checkbox"
                        className="Input"
                        checked={item.main}
                        onChange={(e) => setMainImage(e)}
                        name={item.filename}
                      />
                      <button
                        className="Btn-4"
                        onClick={() => removeOGImage(item)}
                      >
                        <FontAwesomeIcon icon={faX} className="Icon" />
                      </button>
                    </div>
                    <img
                      src={`api/product/image/${item.filename}`}
                      alt="image"
                      className="Image"
                    />
                  </div>
                );
              })}
              {files.map((item, i) => {
                let newSrc = URL.createObjectURL(item.file);
                return (
                  <div className="ImageBox" key={i}>
                    <div className="Top">
                      <input
                        type="checkbox"
                        className="Input"
                        checked={item.main}
                        onChange={(e) => setMainImageNew(e)}
                        name={item.file.name}
                      />
                      <button
                        className="Btn-4"
                        onClick={() => removeNewImage(item)}
                      >
                        <FontAwesomeIcon icon={faX} className="Icon" />
                      </button>
                    </div>
                    <img src={newSrc} alt="image" className="Image" />
                  </div>
                );
              })}
            </div>
          </div>

          <input type="submit" className="Btn" />
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
