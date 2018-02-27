//Question 1
//---------------------------------------------------------------------------
//a. 1
public Trip(String cust, String dest, int pass, RouteType rt,  boolean hst){
	this.customer = cust;
	this.destination = dest;
	this.noOfPassengers = pass;
	this.route = rt;
	this.hoist = hst;
}

//a. 2
public getCustomerName (){
	return this.customer;
}

//a. 3
//definitions - get form Malik


//b. i
explain
--------
public -
private -  
final - 
static -

//b. 2
//I did not use nexHireNo, it going to throw error when we actually run the code because ther is no field 
//declared in the Trip class that is I think mentioend as Hire class in the question.
//this is what I am gonna do in consstructor
public Trip(.......){
	Trip.nextTripNo++;
}

//I can also declare a sperate method for it like this
public void increaseTripNo(){
    Trip.nextTripNo++;
}


//b. 3
// Because values are going to be constant and never be modified. It can improve the maintainability of the code
// because whenever we chck the state of a trip, we just easily check the status using that static field like this
// - if(trip.getState() == Trip.ARRIVED). If we do not do that way, we will have to hard code to check the state
// of a trip (eg - trip.getState() == 1). Therefore, setting them as constant will enhannce the readibily and maintainability 
// of the code. 


// http://brevitaz.com/encapsulation-example-benefits-java/

// private:
// by not letting the other clases directly access to that field and using accessors and mutators,
// we can set some restrictions relating to that field when cleint class access it from mutator and accessor.


//Question 2
//=============

//2 a - 1
Trip trp2= new Trip("Bob", "York", 6, RouteType.UK,  true);


//2 a - 2
trp3.getCustomerName();

//2 a- 3
double cost = trp1.getTotalCost(30);

//2 a- 4
System.out.println(trp2.toString());


//b
supplier - Trip class is a supplier because it is supporting other classes by allowing to use it and its services.
Eg- Trip class is supplier to TripTest 


client - Trip class is using the otherr classes and services of the the other classes.
Eg - Trip class is the client to RouteType




//Question 3
//============
Vehilcle
-----------
private String registration; 
private int mileage; 
private int availability;
private final int maxPassengers = 5; 
private int costPerMile; 
public static final int AVAILABLE = 1; 
public static final int ONTRIP = 2; 


Car 
---
private boolean mercedes;


// private String registration; 
// private int mileage; private int availability;
// private final int maxPassengers = 5; 
// private int costPerMile; 
// private boolean mercedes;




Minibus
-------
// private String registration; 
// private int mileage;
// private int maxPassengers ; 
// private int costPerMile = 5; 
// private int availability;

private boolean hoist; 



//3. b

 //We can set default costPerMile value for Minubus to 5 using 4th argument
public Vehicle(String reg, int miles , int maxPass, int costPerMille){

	this.registration = reg;
	this.mileage = miles;
	this.maxPassengers = maxPass;
	this.costPerMile = costPerMile;
	this.availability = AVAILABLE;
}

public Car(String reg, int miles, boolean merc){
	super(reg, miles, 5, 0);
	this.mercedes = merc;
}


public Minibus(String reg, int miles, boolean hoist){
	super(reg, miles, 0, 5);
	this.hoist = hoist;
}

//3. c
Overriding means the child class will get its own version of method by Overriding the parent's method
By overring toString() method of Vehicle (parent class) from the child classes, in this suitation we are implementation the polyphysm
The variable of parent type class (vehicle) will be able to  hold the child class type object (car aor minibus). Eg. Vehicle car = new Car(parameters.....);
But when we call that toString() method on that variable (car in the example), we will get child class's own version of method because child class
is overriding toString() method.
One of the ways "overriding" can simplify the code in the Garage class is
If we want to print out details and all the vehicles inside garage, we will use toString() method of the Garage class.
So to print out the list of vehicles with its details including the type of vehicle without "overriding" would be like this
listOfVehicles = "";
for(Vehicle v in vehicles){

	if(v instanceof Car){
		listOfVehicles += v.getName() + " car";//Maybe store other data as well
	}else{
		//mini bus
		garageData += v.getName() + " Minibus";//Maybe store other data as well
	}
}
System.out.println(listOfVehicles);
If we implement "overriding", we can remove the conditional "if statement" for checking the type of object using instanceof in the loop
for(Vehicle v in vehicles){
	
	listOfVehicles += v.toString();
}



//4(a)
(1) Vehicle class must declare the ifself as "abstract" and cannot have any implementation for getCostPerMile() function.
(2) Child classes must provide the implementatio for the getCostPerMile() method or they must declare that function as "abstract" again
if they dont want to implement it
(3) Client classes like Garage. In the client class, they cannot initialize the instance of Vehicle class like this.
new Vehicle(arguments.....);
 But variables of Vehicle type can be declared to hold the instances and objects of child classes like this
 Vehicle car = new Car(......);
 Vehicle minuBus = new Minibus(.......);


 //4(b)
 Similiaries of abstract and interfaces
 ---------------------------------------
 (1) The abstract class cannot provide implementation for the abstract and interface ...........
 (2) Child class inheriting the abstract class must provide implementation for the abstract and interface ............

Differences
-----------
(1) Abstract can have concreate fields and methods
(2) Abstract can have constructor for use of sub-classes



//4(c)
1. ArrayList is not a legacy class, it is introduced in JDK 1.2.
2. ArrayList is fast because it is non-synchronized.

Since vector is the old and legacy technology, it will fade out in the future. It will not longer be supported with update in the future
that will effect the maintainability and quality of the code to keep the code update-to-date with new features and technologies



Section B
=========
5 (a) (1)
allTrips.put(ttt.getRegistrationNumber(), ttt);

5 (a) (2)
allCars.put(cc3.getRegistrationNumber(), cc3);

//replace getRegistrationNumber with suitable that will give u unique value.



5 (b)
        String customerNames = "";
        for(Trip t: this.allTrips){
            customerNames = customerNames + t.getCustomerName();
        }
        return customerNames;


(c) Old version is using tweo different collections for storing Car and Minibus.
private HashMap<String,Car> allCars = new HashMap<String,Car>();
private HashMap<String,Minibus> allMinibuses = 
                                  new HashMap<String,Minibus>();
So when we want to show all the vehicles, now we have to loop throgh both collection
for(int i = 0 ; i< allCars.size(); i++){

}


Implementing inheritance adding Vehicle, advantage is we only need one collections to store both Car and Minibus 


5 (d)
If we use Array to store Trip and Vehicle in the Garage, we can only store limited numbers of trips and vehicles
because we have to define fixed size when we initialize the array;
private String[] testingArray = new String[6];

If we use Array instead of HashMap and if we want to check any specific object contains in a collection, we
will have to loop through the array and check like this
for(int i; i< testingArray.length; i++){
	if(testingArray[i].equals(testValue)){
		return true;
	}
}

If we use HashMap, we do not need to loop through, all we need to do is
return allTrips.contains(trip1);

The reason programmer chose two classes was to optimize the Cohesive.
Now trip class will be foucsing on the funnatlies related
Ve
So now the design has High Cohesion















z

try{

}
catch(Reg)
catch(Reg)



"Interface advice"
-------------------
Using interface we are making sure that all the classes implementing the interface must provide implenentation for 
all the  methods. So the code become more maaintable because when other program, and create a new class
(Design by contract)

Create loosely coupled software

Top level


Allow different objects to interact easily


 POLYMOPHYSM
 =================================================================================================>


 Polymorphic creation
 a variable declared with a supertype (parent) can be implemented as an object of a subtype (child)
	Item x1 = new DVD(......);
 Polymorphic assignment
 a variable declared as a subtype (child) can be assigned to a variable of a supertype (parent)
	Item x2 = v1;    // v1 is an object of type DVD

Overriding
-Run time system will determine which version of the method it should use from the object
-super should only be used if we want features from the parent version.

Polymohic array advantage
- Programming needs to be done only at the superclass level



Abstract
==================================================================================================>
-Client classe cannot create Item objects using the constructors but can still declare Item variable


(implication of abstract)
-Method no need body
-Even one abstract method, the whole class must be declared as abstract
-Child "extends" must provide implementation or declare as abstract themself


In client
----------
Must use Polymorphic creation to create concrete object
Item myItem = new DVD(.....);



Abstract class is not required to have an abstract method


interfaces
======================================================================================================>







Abstract vs interface
=====================
Similiaries
-----------
1. Abstract method no body
2. Child must override the method or declare it as abstract again




Differences
-----------
1. Abstract class can have concrete fields and methods
2. Can have constructor for the use of sub-classes
3. Subclasses user "implements" to interface to "extends" to the abstract class
4. Subclasses can implement more than one interface



