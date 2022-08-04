speed machanics:
1. Begin of turn 1:
	all.cnt = all.spe
	while(有精灵没出手) {
		cnt最大的精灵出手
		others.cnt += others.spe
	}
	end turn
2. Begin of turn >1:
	all.cnt -= lowest.cnt
3. On switch in:
	mon.cnt = mon.spe
4. Example 1: 
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
5. Example 2:
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
5. Example 3:
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
6. Para
	no longer full para
	spe /= 3