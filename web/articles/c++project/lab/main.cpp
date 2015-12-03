#include <iostream>
using namespace std;

#include "Plane.hpp"
#include "Wheel.hpp"

int main() {
    // 像定义一个变量一样定义一个对象
	// Plane mh370(10);
	Wheel wheel(5);
	wheel.getDiameter();
	// cout<<"wheel's diameter is:"<< wheel.getDiameter()<<"\n";

	// 读取当前速度
	// cout<<"plane current speed:"<< mh370.getSpeed()<<"\n";
//
//	cout<<"speed up 5"<<"\n";
//	mh370.speedUp(5);
//	mh370.printCurrentSpeed();
//
//	cout<<"speed down 15"<<"\n";
//	mh370.speedDown(15);

	//mh370.printCurrentSpeed();
	//mh370.speedDown(20);
}