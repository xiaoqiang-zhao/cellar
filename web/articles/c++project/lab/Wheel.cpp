#include "Wheel.hpp"
/**************** 实现 ****************/
// 构造函数,用来初始化对象
Wheel::Wheel(int dia) {
    diameter = dia;
}

int Wheel::getDiameter() {
    return diameter;
}