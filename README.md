# comtrade-internship-app
Business Trip Advisor - a Comtrade internship project<br>
<h2>Contributors</h2>
<ul>
 <li>https://github.com/stefancvetincanin - Stefan Cvetinčanin</li>
 <li>https://github.com/marko83nbg - Marko</li>
 <li>https://github.com/darkoradisavljevic - Darko Radisavljević</li>
 <li>https://github.com/lazarvelickovic - Lazar Veličković</li>
 <li>https://github.com/toshew - Vladan Tošev</li>
 <li>https://github.com/PetrovicNatasa - Nataša Petrović</li>
</ul>
<h2>Built using</h2>
<ul>
 <li>Bootstrap and jQuery for the front-end</li>
 <li>Node.js and mySql for the server-side</li>
</ul>
<h2 title="Čemu ovo služi a pritom i ne radi?">What is this?</h2>
<p>
  Application Business Trip Advisor should improve internal communication among employees who are traveling for business. In the first phase, the application provides information about accommodation and life in the city to Comtrade employees, and gives them the opportunity to share useful information with their colleagues for future trips to the same location.
</p>
<h3>Git uputstvo</h3>
git cheat sheet:<br>
https://www.git-tower.com/blog/git-cheat-sheet<br>
<br>
Uvek radite na svojoj grani, nikad na masteru!<br>
Na pocetku radnog dana uvek updateujemo lokalnu master granu sa remote verzijom:<br>
1. Preci na master granu i povuci najnoviju verziju:
<pre>
 git checkout master
 git pull
</pre>
2. Preci na licnu granu, povuci najnoviju verziju nje i spojiti sa masterom (mozete raditi ovako radi jednostavnosti, ali preporucljivo je da kad god radite novi feature uvek napravite novu granu od mastera samo za taj feature, i obrisete je posto je spojite sa masterom):
<pre>
 git checkout &lt;ime-grane&gt;
 git pull
 git merge master
</pre>
Proces kacenja svojih podataka:<br>
<pre>
 git add .
 git commit -a -m "tekst poruke commita (obavezan)"
 git push
</pre>
<br>
Kad okacite najnoviju verziju svoje grane, otvorite pull request da je spojite sa masterom.<br>
