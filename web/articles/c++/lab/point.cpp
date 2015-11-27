#include <iostream>
#include "Plane.hpp"
using namespace std;

int main() {
    int num = 5;
    cout<<"1：num:\t"<<num;
    cout<<"\tAddress of num:\t"<<&num<<"\n";

    int *pNum = &num;
    int *pNull = NULL;
    cout<<"2：*pNum:"<<*pNum<<"\n";
    *pNum = 10;
    cout<<"3：num:"<<num<<"\n";
    cout<<"4：pNum:"<<pNum<<"\n";

    Plane *pPlan = new Plane(5);
    pPlan->printCurrentSpeed();
    delete pPlan;

    return 0;
}