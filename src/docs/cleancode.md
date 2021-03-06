# Clean Code

## Namen

"Klasse = Nomen" / "Methode = Verb" unterscheidet sich in sofern von all den anderen "sollte man,
aber nicht immer", in dem Punkt, dass es in den Fällen, wo man es nicht sollte wirklich falsch zu
sein scheint und keine reine Meinungssache.

Wenn die Natur des zu Benennenden eine Funktion ist, ein Funktor, eine Methoden-Referenz, dann
sollte der Name ein Verb sein, egal in welche Richtung Einen die Sprache drängt.

Andersherum, wenn die Natur des zu Benennenden ein Ding ist, eine Instanz von etwas, ein Konzept,
dann sollte der Name ein Substantiv sein. Egal was die Sprache bevorzugt.

### Weitere Regeln

 * `MyClassName` - upper camel case
 * `myMethod` - lower camel case
 * `CONSTANT` - constant

 Für die ersten beiden sehe ich nur in absoluten Sonderfällen eine Ausnahme, bei letzterem
 bin ich mittlerweile hin und hergerissen.

 Der Weg von `CONSTANT` als Präprozessor-erzeugter Konstante zu heutigen "konstanten" Objekten
 scheint doch sehr weit.

 Wir hatten mal in Java die Regel, dass alles was "static final" ist, eine solche `CONSTANT` sein
 muss.

 Wenn das Objekt allerdings veränderbar ist, macht das eigentlich auch keinen Sinn.

 In Javascript ist es dann häufig noch schlimer.

 Einerseits ist ein `CONST` schon irgendwo eine Aussage im Sinne von "Ich beabsichtige dieses Objekt nach
 der initialisierung nicht mehr zu verändern".

 Andererseits ist UPPER_CASE klar schwerer lesbar, vor allem wenn es massiv auftaucht.

## Funktionen

Alle Punkte mehr oder weniger stichhaltig.


### Step-Down

Am schwächsten fand ich das Step-Down, dass ich
aber immer noch als möglicherweise zu beachtenden Punkt gelassen hätte.

IntelliJ macht das in sofern automatisch, als das "Extract Method"-Refactoring die neue
Methode unterhalb der alten packt.

Und wenn man halt gerade Code schreibt und sich fragt, wo welche Methode stehen könnte, dann
kann man ja mal an das Step-Down denken.


### Switch-Konstrukte

Nicht völlig falsch, aber auch eher schwach. Code-Navigation macht Switch über Enums eigentlich
kein Problem. Man könnte zusätzlich mal über eine Enum-Methode nachdenken, wenn die Methode
wirklich für die vorhersehbare Zeit gleich bleibt usw.

### "Um..Zu"

Ist ganz interessant, wirkt aber viel zu gestelzt um wirklich eine Handlungsanweisung zu sein.

## Funktionsargumente

### 3+ Argumente

Kann man nicht so hart formulieren, denke ich. Gerade in abstrakten System gibt es halt Operationen,
die viele Sub-Systeme betreffen.

Die Frage, die man sich stellen sollte ist zum Ersten, ob die Funktion evt zu komplex ist und herunter
gebrochen werden kann.

Dann sollte man über die Kategorisierung von Objekten in Infrastruktur und Operations-Argument nachdenken.

Ist dieses Argument wirklich etwas, was für die Funktion der Methode spezifische Informationen enthält?

Oder ist es ein Infrastruktur-Objekt, dass von irgendwoher injected werden sollte stattdessen. um
dann ein finales Klassenfeld zu sein?

Wenn eine Funktion ausschließlich spezifische Argumente hat und sich gefühlt nicht mehr
kleiner machen lässt, dass hat die Funktion halt so viele Argumente, wie sie hat.

## Flag-Argumente

Vermeiden, über Enums nachdenken.

Ein `Boolean` ist häufig Quatsch und sollte ein Enum mit 3 Elementen sein, es sein denn es bedeutet
wirklich "undefiniert", weil man z.b. eine `boolean` Konfiguration irgendwo hat, die man
lokal überschreiben können möchte, wobei man aber eben zwischen "Lokal ist wahr", "Lokal ist falsch"
und "Lokal ist nicht angegeben" unterscheiden können möchte.

In JavaScript wäre sowas natürlich dann eher ein Default-Argument.

````js
export function myFunction(flag = MyConfiguration.globalFlag)
{
    ...
}
````

Für mich wäre die Enum-Empfehlung in Java um einiges stärker als in JavaScript, weil die
Enums eh nur glorifizierte Strings sind.

## Keine Nebeneffekte

Ist für Klassen-Methoden einfach Unsinn, und für JavaScript führt es zu orthodoxem Functional-Programming, dass
keine Empfehlung sein kann.

FP ist einfach eine Nische und man hat nie genug Entwickler, die wirklich gut in FP programmieren können, was dann
wieder zu sehr viel fragwürdigem FP code führt.

Die Performance in JavaScript ist alles andere als berauschend. Java ist vielleicht "okay".

Man sollte sich mit den Vorteilen von funktionaler Programmierung auseinandersetzen und
ein gutes Maß zwischen imperativer und funktionaler Programmierung finden.

Vor allem sollte man nicht probieren, Dinge imperative zu machen, die eher funktional sind und
umgekehrt.

React und Mobx sind sehr funktional, benutzen aber auch Klassen. JavaScript Klassen sind unterschiedlich von
Java.

## Kommentare

"Javadoc zu nicht-öffentlichen Code" verstehe ich nicht wirklich.

JavaDoc hat die Option privates JavaDoc zu generieren, wo ist das Problem? Ausserdem ist es eine
feste Struktur, die man auch zu anderen Zwecken abgreifen kann. (Auto-generierung von POJO-Dokumentation)

### Auskommentierter Code

Eher nicht, manchmal aber schon, für ne Zeit.

## Formatierung

Ich habe noch kein einziges vernünftiges und rationales Argument für Klammern auf der selben Zeile
gehört.

Es läuft immer auf "Das haben wir schon immer so gemacht" oder "Das fühlt sich richtig an".

Das vertikale Ausrichtungs-Argument ist im Vergleich dagegen geradezu stichhaltig.

Ich habe ein Argument *für* Egyptian Brackets gefunden, genau dort, wo ich es auch benutze, nämlich
für Objekt-Literale.

```js
    return
    {
        foo:1
    }

```

Das returned "undefined". weil es als

```js
    return;
    {
        foo:1
    }

```
 
Interpretiert wird.

 
Generell sieht man im React-Umfeld viel
 

```js
    return (
        <div>
            ...
        </div>
    )
```

aus dem gleichen Grund. Automatische Semikolon-Einfügung (seufz). 

Also 

```js
    return {
        foo:1
    }
```

Gleiches würde ich für Java Lambdas, Java Anonymous Classes (die ich fast nie verwende) und in Js auch Fat Arrows verwenden.



## Objekte und Datenstrukturen

Nahezu komplette Ablehnung, und ausserdem mich ich hier auch rein faktisch sagen, dass dieser
Punkt gelaufen ist. Unsere Architektur steht soweit, solange wir die nicht radikal ändern,
ist dieser Abschnitt Makulatur.


## Bevorzuge Komposition über Veerbung

Die Bevorzugung von Komposition (Klassen die Klassen *benutzen*) gegenüber Vererbung (Klassen *sind* Veerbungen anderer 
Klassen) ist ein wesentlicher Punkt in der Anwendungsarchitektur. 

[Wikipedia](https://de.wikipedia.org/wiki/Komposition_an_Stelle_von_Vererbung) erklärt hier einiges, es fehlen aber
noch wesentliche Aspekte.

Zum Einen das "Liskovsche Substititutionsprinzip", dass zumindest in der englischen Version verlinkt wird. Zum
anderen dann in Java die Komplexitäten von equals/hashcode in Verbindung mit Polymorphie. Hier sei nochmal
das Lesen "Effective Java" von Joshua Block empfohlen, dass meine Erinnerung auch auf diese Problem eingeht.

Mit dem Fazit für mich, dass sich die generelle weichere Stil-Empfehlung durch die Komplexität der richtigen
Implementation direkt den Punkt Code-Qualität und Programm-Korrektheit erreicht. "Equals/hashcode" Probleme zu debuggen 
ist brutal.    

Wichtiger Punkt.  

## Fehlerbehandlung

Hier sollte man nochmal ein komplettes Konzept auf Basis des Spring-Container-Handlings von Exceptions im
Kontext der verschiedenen Technologien.

Wir brauchen noch ein schlüssiges Fehlerbehandlungskonzept für die Client-Seite.. Monitoring usw.

### Exceptions

Wir benutzen bevorzugt unchecked Exceptions und bevorzugt typisierte Exceptions, d.h. pro Project gibt es eine

```java
package de.quinscape.domainql;

/**
 * Generic runtime exception for the DomainQL project.
 */
public class DomainQLException
    extends RuntimeException
{
    private static final long serialVersionUID = -3518149341721548644L;


    public DomainQLException(String message)
    {
        super(message);
    }


    public DomainQLException(String message, Throwable cause)
    {
        super(message, cause);
    }


    public DomainQLException(Throwable cause)
    {
        super(cause);
    }
}
```

von der jede Project-Exception erbt.

Wenn es definierte Fehlerfälle in einem Teilbereich gibt, sollten diese in der Regel solche abgeleiteten Exceptions
sein. 

```java
package de.quinscape.domainql;

public class DomainQLExecutionException
    extends DomainQLException
{
    private static final long serialVersionUID = -8343955271035853751L;


    public DomainQLExecutionException(String message)
    {
        super(message);
    }


    public DomainQLExecutionException(String message, Throwable cause)
    {
        super(message, cause);
    }


    public DomainQLExecutionException(Throwable cause)
    {
        super(cause);
    }
}
```

Jede Exception muss:

 * Die notwendigen Konstruktoren bereitstellen (nicht sicher wegen dem moderneren Kram in RuntimeException)
 * eine serialVersionUID haben (auto-generiert per IDE-Plugin)
 
 Die Fehler-Details werden auf der throw-Seite als String übergeben. Eventuell hat die Exception eine Kontext
 der bei der Behandlung wichtig ist.
 
### Checked Exceptions in Interfaces

Die "Wir benutzen unchecked" heißt natürlich nicht, dass wir die checked ignorieren oder nie benutzen. 
Analog zu Spring würden wir für Framework-artige Interfaces, bei denen heterogene zukünftige Implementation
weiß-Gott-was für APIs benutzen.

Wenn wir jetzt aber nicht

```java
public interface MyInterface()
{
    public Result doSomething() throws Exception
}
```

Machen, muss die Implementierung alle checked Exceptions wrappen. Dann ist es aber besser, wenn wir zunächst
Exception fangen und es dann in die richtige Exception auf unserer Seite zu wrappen, anstatt das noch eine 
intermediäre Runtime Exception in der Exception-Kette auftaucht, die evt. noch den Typ der ursprünglichen
verschleiert.
 
## Test


### Arrange-Act-Assert

Zustimmung. Reine Ausführung ist nicht genug Tests, wir brauchen bedeutsame Asserts.

### Domänenspezifische Testsprache

Auch generelle Zustimmung. Hilfs-Methoden und eventuell eigene Test-Builder sind hervoragende
Mittel zur Erhöhung der Test-Lesbarkeit.

### Nur ein assert pro Test?

Starke Ablehnung. Die Viabilität einer Test-Suite steht und fällt mit der Fähigkeit, mal eben zu testen.

Wenn der Test so lange dauert, dass man sich einen Kaffee holen könnte, wird er nicht mehr dauernd ausgeführt.

Das Arrange in Arrange-Act-Assert kostet Zeit.

Eine testbare Aktion hat einen Kontext der eindeutig eine Mehrzahl von Werten umfasst.

### TDD

Starke Ablehnung.

Ich verstehe die Argumente, die für eine Verwendung von TDD sprechen, sehe aber auf der anderen
Seite, dass die meisten Menschen nicht so denken.

Und ich habe immer noch Zweifel das der Autoren-Zirkus der rumreist und sagt "Ach das geht schon, hier guck mal", dies
wirklich in nennenswerten Projekten durchzieht.

Am ehesten scheint dies noch zu funkionieren, wenn man den generellen Entwicklungsprozess einem
solchen TDD-Guru unterwirft und extra für TDD eine Einwandfrei isolierte inner Domain-Schicht
erzeugt, eine aufwendig geschaffene Traumwelt, in der man dann TDD zelebrieren kann.
( https://en.wikipedia.org/wiki/Conway%27s_law )

Unter verzigfachung des Aufwands.

Auch in Hinsicht auf Framworks und Client-Server Workflows ist es häufig fragwürdig.

Am besten TDD tauglich wäre in unserem Fall wahrscheinlich Mocha-Tests für die Mobx Domänen-Modelle. Das ist
auch schon hinreichend isoliert von sich aus.

### Aber irgendwie schon Test-Driven

Tests bleiben aber das Allerwichtigste, um dauerhaft Code-Qualität sicherzustellen.

Tests haben aber, vor allem, das sich auch "Clean Code" sind, ein Gewicht,
das man mit sich herum trägt. Schlechte Tests sind schlecht. Wichtig ist die Ausagekraft des Test-Setups.

Es gibt Tests die in Summe wirklich was wiegen, aber nur Pille-Palle-Kram testen. **Schlecht**

Es gibt Tests, die so brüchig sind, dass sie am Ende nur eine wirkliche Aussage enthalten, nämlich
das der Code sich seit Erstellung des Tests nicht geändert hat. Solche Tests brauchen wir nicht,
um das sicherzustellen haben wir eine Quellcode-Verwaltung. **Schlecht**

### Testing? Not yet

Analog zur Premature Optimization gibt es auch ein zu frühes Testen. Tests sind gut um Code festzunageln. Solange
der Code nicht wirklich fest ist, behindern die Tests.

Ausnahmen sind natürlich Teilbereiche, bei denen von vorne herein klar ist, dass es sich
um eine isolierbare Funktionalität mit offensichtlicher Architektur und nicht-trivialer Funktionalität.
Solche Tests sind in der Regel gut und halten ewig. Sie sind auch meistens sehr schnell.


### Gute Tests

Gute Tests testen wirklich den Kern der Funktionalität in einer Granularität die resistent
gegen Code-Veränderungen ist. Gute Tests sind dann einfach, wenn der Code testbar ist.

### Fehler testen

Die speziellen Exceptions, die man angelegt hat, kann man dann in Unit-Tests auch gleich testen.

Minimales Fehler-Szenario erstellt, `@Test(expected = MyException.class)` dran, fertig.  

### Testbarkeit!!!1

Und hier kommen wir zu "irgendwie schon Test-Driven" insofern als dass eine wichtige Prämisse
testbarer Code ist, von Anfang an.

Ich muss wissen, wie ich den Code testen kann in einem vertrebaren (sprich minimalem) "Arrange"-Teil.

Wäre für mich sicherlich eine der wichtigsten, wenn nicht die wichtigste Regel.

Ob man dann den Test wirklich schreibt, ist eine andere Frage. Generell sollten wir nichts testen, was
wir duch die IDE erschlagen können. Sprich z.B. keine Tests von Getter  & Setter, weil wir diese
immer per IDE erzeugen.

Das führt auch zu einigen Regeln, die wir noch nicht erfasst haben:

#### Keine Singletons.

Nie nicht. Okay.. vielleicht gaaanz selten.

Das hier fühlt sich nach einem gerechtfertigten Singleton an.

```java
package de.quinscape.domainql.param;

import graphql.schema.DataFetchingEnvironment;

/**
 * Provides the GraphQL DataFetchingEnvironment as a Logic method parameter.
 */
public class DataFetchingEnvironmentProvider
    implements ParameterProvider<DataFetchingEnvironment>
{
    public final static DataFetchingEnvironmentProvider INSTANCE = new DataFetchingEnvironmentProvider();

    private DataFetchingEnvironmentProvider()
    {

    }

    @Override
    public DataFetchingEnvironment provide(DataFetchingEnvironment environment)
    {
        return environment;
    }
}
```
Die Klasse injiziert das DataFetchingEnvironment selbst in GraphQL-Methoden. Die Klasse hat keine Felder und
funktioniert nur auf Basis des einen Typen, von dem die aktuelle Instanz bereitsgestellt wird.

Nichts an dieser Klasse wird sich höchstwahrscheinlich jemals ändern. Falls ich es doch aus irgendeinem
Grund bereuen sollte, ist der Umbau wahrscheinlich nicht schwierig.

Dies sind die Extrem-Beispiele, in denen Singletons Sinn machen.

#### Caches

Statische Caches (einfach Maps oder ConcurrentMaps je nach Concurrency) sind, gerade in der Framework-Basis, ein wichtiges Mittel zur Programm-Performance.

Wenn ich weiss, dass die akumulierte Daten-Menge eines eventuell nie geflushten Caches alles in Allem aber
irrelevant ist **und** ich diese Daten *immer* brauche, um zu machen was ich mache, dann macht
so ein Cache viel Sinn.

Andere Caches, alles mit Eviction-Strategies usw. sollte entweder von Spring gehandelt werden,
oder wir führen Guava-Caches oder so ein, um diese Zentral in der Spring-Konfiguration zu verwalten.

Die erste Art des Caches läuft in Tests as-is, die zweite Art wird wahrscheinlich gemockt oder durch
spezielle Test-Instanzen bereitgestellt.
