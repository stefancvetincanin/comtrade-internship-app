<h2>Moguci pozivi za API</h2>
Vraca korisnika sa navedenim korisnickim imenom i sifrom:
<pre>
  fetch('/login/{username}/{password}')
</pre>
Vraca spisak svih gradova kao niz objekata:
<pre>
  fetch('/cities')
</pre>
Vraca zeljeni grad po id-u:
<pre>
  fetch('/city/{id}')
</pre>
Vraca sve hotele u zeljenom gradu, preko navedenog id-a grada:
<pre>
  fetch('/hotels/{id}')
</pre>
Vraca hotel preko navedenog id-a hotela:
<pre>
  fetch('/hotel/{id}')
</pre>
Vraca sve znamenitosti u nekom gradu, preko navedenog id-a grada:
<pre>
  fetch('/attractions/{id}')
</pre>
Vraca sav feedback za zeljeni grad, preko navedenog id-a grada:
<pre>
  fetch('/feedback-grad/{id}')
</pre>
Vraca sve komentare za neki feedback, preko navedenog id-a feedbacka:
<pre>
  fetch('/komentar-grad/{id}')
</pre>
