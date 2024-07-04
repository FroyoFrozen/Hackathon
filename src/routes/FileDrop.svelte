<script>
  import { onMount } from 'svelte';
  import * as XLSX from 'xlsx';
  import { db } from './firebase.js';
  import { collection, doc, setDoc } from "firebase/firestore"; 

  /**
   * @type {Blob}
   */
  let file;
  
  /**
   * @param {{ preventDefault: () => void; dataTransfer: { files: any; }; }} event
   */
  function handleDrop(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }
  
  /**
   * @param {Blob} selectedFile
   */
  async function handleFile(selectedFile) {
    file = selectedFile;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      
      // Process each sheet in the workbook
      for (const sheetName of workbook.SheetNames) {
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        // Get the header row
        const headers = json[0];
        let records = json.slice(1).map((row, index) => {
          let record = {};
          row.forEach((cell, idx) => {
            record[headers[idx]] = cell;
          });
          if (row[0]) {
            record.id = row[0]; // Use the time value as the document ID
            return record;
          }
        });

        records = records.filter(row => row !== undefined);

        console.log(`Uploading data for sheet: ${sheetName}`);
        console.log(records); // Debugging output

        // Upload data to Firestore
        await uploadDataToFirestore(sheetName, records);
      }

      // Reload the page after all data is uploaded
      location.reload();
    };
    reader.readAsArrayBuffer(selectedFile);
  }

  /**
   * Uploads data to Firestore
   * @param {string} sheetName
   * @param {Array} data
   */
  async function uploadDataToFirestore(sheetName, data) {
    try {
      const collectionRef = collection(db, sheetName);
      for (const record of data) {
        const docRef = doc(collectionRef, record.id);
        await setDoc(docRef, record);
      }
      alert(`Data for ${sheetName} uploaded successfully!`);
    } catch (error) {
      console.error("Error uploading data: ", error);
      alert("Error uploading data. Check the console for more details.");
    }
  }
  
  function handleDragOver(event) {
    event.preventDefault();
  }
</script>

<div
  on:drop={handleDrop}
  on:dragover={handleDragOver}
  class="dropbox"
>
  Drop your Excel file here 
  <input type="file" accept=".xlsx, .xls" on:change="{(e) => handleFile(e.target.files[0])}" />
</div>

<style>
  .dropbox {
    border: 2px dashed #ccc;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    margin: 20px 0;
  }
  .dropbox input {
    display: none;
  }
</style>
