**A. Type Machanics**
1. Digimon Types: Vaccine, Data, and Virus
	- Most Digimon have and only have one of the three Types
	- No moves are of these three Types
	- Type Relationship
		- Digimon with Vaccine Type deals 1.5x damage to those with Virus Type
		- Digimon with Virus Type deals 1.5x damage to those with Data Type
		- Digimon with Data Type *receives* 1.5x *less* damage from those with Vaccine Type

2. Light Type
	- A Type used to replace Fairy Type
	- It has the same typechart as Fairy Type, except that it is only resistant to Dragon instead of being immune to

**B. Learnset Machanics (To Be Implemented)**
- Digimon are allowed to choose Pre-Evolution species in teambuilder
	- A Digimon may have multiple Pre-Evolution species
- Digimon can learn all moves learnt by their chosen Pre-Evolution
- Digimon cannot necessarily learn some moves learnt by the Pre-Evolution of their chosen Pre-Evolution

**C. Speed Machanics (Not Implemented)**
1. Begin of turn 1:
	```
	all.cnt = all.spe
	```
2. Move Algorithm:
	```
	while(exists mon hasn't moved) {
		mon with max cnt move()
		others.cnt += others.spe
	}
	```
3. Begin of turn >1: 
	```
	all.cnt -= lowest.cnt
	```
4. On switch in:
	```
	mon.cnt = mon.spe
	```
5. Example 1: 
	```
	A.spe = 300, B.spe = 200
	turn 1: A.cnt = 300, B.cnt = 200
		A move, B.cnt = 400
		B move, A.cnt = 600
	turn 2: A.cnt = 200, B.cnt = 0
		A move, B.cnt = 200
		B move, A.cnt = 500 (the unmoved moves when same cnt)
	turn 3: A.cnt = 300, B.cnt = 0
		A move, B.cnt = 200
		A move, B.cnt = 400
		B move, A.cnt = 600
	turn 4: A.cnt = 200, B.cnt = 0
	```
6. Example 2:
	```
	A.spe = 300, B.spe = 200
	turn 1: A.cnt = 300, B.cnt = 200
		A move agility, A.spe = 600, B.cnt = 400
		B move, A.cnt = 900
	turn 2: A.cnt = 500, B.cnt = 0
		A move, B.cnt = 200
		A move, B.cnt = 400
		A move, B.cnt = 600
		B move, A.cnt = 1100
	turn 3: A.cnt = 500, B.cnt = 0
	```
7. Example 3:
	```
	A.spe = 200, B.spe = 300
	turn 1: A.cnt = 200, B.cnt = 300
		B move, A.cnt = 400
		A move agility, A.spe = 400, B.cnt = 600
	turn 2: A.cnt = 0, B.cnt = 200
		B move, A.cnt = 400
		A move, B.cnt = 500
	turn 3: A.cnt = 0, B.cnt = 100
		B move, A.cnt = 400
		A move, B.cnt = 400
	turn 4: A.cnt = 0, B.cnt = 0
		B move, A.cnt = 400
		A move, B.cnt = 300
	...
	```
8. Para: no longer full para, `spe /= 3`