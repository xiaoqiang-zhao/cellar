// lu 串行分解
//#include"stdafx.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <iostream>
using namespace std;

int n;
double **l;
double **u;
double **m;
clock_t t1, t2;
void lud(int n);
int main(int argc, char * argv[])
{
	cout << "input n of a: " << endl;
        	cin >> n;
    for (int i = 1; i < n; i++)
    {
    int j=100*i;
    	lud(j);

    }
	return 0;
}

void lud(int n)
{

	srand((unsigned)time(NULL));
	m = new double*[n];
	u = new double*[n];
	l = new double*[n];

	for (int i = 0; i < n; i++) {
		m[i] = new double[n];
		for (int j = 0; j< n; j++) {
			m[i][j] = rand() % 8;
		}
	}
	for (int i = 0; i < n; i++) {
		u[i] = new double[n];
		for (int j = 0; j< n; j++) {
			u[i][j] = 0;
		}
	}

	for (int i = 0; i < n; i++) {
		l[i] = new double[n];
		for (int j = 0; j< n; j++) {
			l[i][j]=0;
		}
	}

	t1 = clock();
	int i = 0, j = 0, k = 0;
	for (j = 0; j < n - 1; j++) {
		for (i = j + 1; i < n; i++) {
			double factor = m[i][j] / m[j][j];
			for (k = 0; k < n; k++) {
				u[i][k] = m[i][k] - (m[j][k] * factor);
			}
			l[i][j] = factor;
		}

		for (i = 0; i < n; i++) {
			for (k = 0; k < n; k++) {
				m[i][k] = u[i][k];
			}
		}
	}
	t2 = clock();
	//cout << "time consuming: \n"<<double(t2 - t1)/CLOCKS_PER_SEC <<'s' << endl;
	fprintf(stderr, "size of a %d,time consuming: %lums\n,",n , 1000*(t2 - t1)/CLOCKS_PER_SEC);

}
