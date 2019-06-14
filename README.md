# comtrade-internship-app
Business Trip Advisor - a comtrade internship project<br>
<br>
git cheat sheet:<br>
https://www.git-tower.com/blog/git-cheat-sheet<br>
<br>
Uvek radite na svojoj grani, nikad na masteru!<br>
Na pocetku radnog dana uvek updateujemo master granu sa trenutnom verzijom:<br>
1. Preci na master granu i povuci najnoviju verziju:
<pre>
 git checkout master
 git pull
</pre>
2. Preci na licnu granu i spojiti sa masterom:
<code>
 - git checkout &lt;ime-grane&gt;
 - git merge master
 </code>
Proces kacenja svojih podataka:<br>
<pre>
 git add .
 git commit -a -m "tekst poruke commita (obavezan)"
 git push
</pre>
<br>
Kad okacite najnoviju verziju svoje grane, otvorite pull request da je spojite sa masterom.<br>
