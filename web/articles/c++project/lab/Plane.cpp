#include "Plane.hpp"
/**************** 实现 ****************/
// 构造函数,用来初始化对象
Plane::Plane(int speed) {
    setSpeed(speed);
}

// 析构函数,用来释放对象内存空间
Plane::~Plane() {

}

void Plane::setSpeed(int newSpeed) {
    speed = newSpeed;
}
void Plane::printCurrentSpeed() {
    // printf("current speed:%d\n", speed);
}

/**
 * 加速
 *
 * @param {int} num 要增加的速度
 * @return {int} speed 增加之后的速度
 */
int Plane::speedUp(int num) {
     speed += num;
     doSomething();
     return speed;
}
void Plane::speedDown(int num) {
    speed -= num;
    if (speed < 0) {
        speed = 0;
        // cout<<"speed has benn zero.\n";
    }
    doSomething();
}
void Plane::doSomething() {
    // cout<<"please bee careful, speed is changing.\n";
}