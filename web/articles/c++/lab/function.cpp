#include <iostream>
using namespace std;

// 函数声明,
int getArea(int width,int height);

int main() {
    int width,height,area;
    cout<<"width:";
    // 接受参数
    cin>>width;
    cout<<"height:";
    cin>>height;
    // 调用函数
    area = getArea(width, height);
    // 打印输出
    cout<<"area:"<<area<<"\n";
}

// 函数定义
int getArea(int width,int height) {
    return width * height;
}