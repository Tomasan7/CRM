
<div id="dialog-confirm" title="Empty the recycle bin?" style="display:none">
  <p><span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span>These items will be permanently deleted and cannot be recovered. Are you sure?</p>
</div>
  <form action="" class="form" id="<?php //echo $_GET["id"]; ?>">
  <button id="closeIframe">Zavřít</button><br>
    <p class="field">
     <!-- <h2 class="label" style="font-size:">Zobrazení a editace firmy</h2>//-->
      30px
    <label class="editFirmSuccess">Uloženo</label>
       
    </p>
  <p class="field required">
    <label class="label required" for="name">Firma</label>
    <input class="text-input" id="name" name="name" required="" type="text" value="<?php //echo $row["name"]; ?>">
  </p>
  <p class="field half">
    <label class="label" for="surname">Kontaktní Osoba</label>
    <input class="text-input" name="surname" type="text" value="<?php //echo $row["surname"]; ?>">
  </p>
  <p class="field half">
    <label class="label" for="email">E-mail</label>
    <input class="text-input" name="email" type="email" value="<?php //echo $row["email"]; ?>">
  </p>
  <p class="field half">
    <label class="label" for="phone">Telefon</label>
    <input class="text-input" name="phone" type="tel" value="<?php //echo $row["phone"]; ?>">
  </p>
  <p class="field half">
    <label class="label" for="source">Zdroj</label>
    <input class="text-input" name="source" type="text" value="<?php //echo $row["source"]; ?>">
  </p>
  <div class="field half">
    <label class="label">Obor</label>
    <select class="select" name="subject_id" required>
          <?php
      $sql2 = "SELECT id, name FROM subject";
      $result2 = $conn->query($sql2);

      if ($result2->num_rows > 0) {
        while($row2 = $result2->fetch_assoc()) {
          ?>
         <option value="<?php echo $row2["id"]; ?>"><?php echo $row2["name"]; ?></option>
         <?php
          
        }
      }
      ?>
    </select>
  </div>
  <div class="field half">
    <label class="label">Aktivní</label>
    <select class="select" name="active">
 
        <option value="0">NE</option>
        <option value="1" selected>ANO</option>
       
    </select>
  </div>
  <div class="field half">
    <label class="label">Datum 1. Kontaktu</label>
    <input class="text-input" name="date_of_contact" type="date" value="<?php //echo $row["date_of_contact"]; ?>">
  </div>

  <div class="field half">
    <label class="label">Datum 2. Kontaktu</label>
    
    <input class="text-input"name="date_of_2_contact" type="date" value="<?php //echo $row["date_of_2_contact"]; ?>">
  </div>

  <div class="field half">
    <label class="label">Datum Schůzky</label>
    <input class="text-input" name="date_of_meeting" type="date" value="<?php //echo $row["date_of_meeting"]; ?>">
  </div>

  <div class="field half">
    <label class="label">Výsledek</label>
    <input class="text-input" name="result" type="text" value="<?php //echo $row["result"]; ?>">
  </div>

  <div class="field half">
    <label class="label">Workshop</label>
    <input class="text-input" name="workshop" type="text" value="<?php //echo $row["workshop"]; ?>">
  </div>

  <div class="field half">
    <label class="label">Brigáda</label>
    <input class="text-input" name="brigade" type="text" value="<?php //echo $row["brigade"]; ?>">
  </div>

  <div class="field half">
    <label class="label">Praxe</label>
    <input class="text-input" name="practice" type="text" value="<?php //echo $row["practice"]; ?>">
  </div>
  <div class="field half">
    <label class="label">CV</label>
    <select class="select" name="cv">
        <option value="1">ANO</option>
        <option value="0">NE</option>
    </select>
  </div>
  
  <span class="extra_colmns"></span>  
  
    
  
  <p class="field">
    <label class="label" for="about">Poznámka</label>
    <textarea class="textarea" cols="50" id="about" name="note" rows="4"><?php //echo $row["note"]; ?></textarea>
  </p>
  <p class="field buttons">
    <button class="button" id="send-button" value="Uložit">Uložit</button>
    
  </p>
  
  </form>
  
  <div id="firm_photos"></div>

<?php
 include "./vendor/dragdrop/uploader.php"; 

?>


