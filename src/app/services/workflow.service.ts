// Імпорт декоратора Injectable з Angular core
// Він дозволяє використовувати цей клас як сервіс
import { Injectable } from '@angular/core';
 
// Імпорт моделі WorkflowList
// Це тип даних одного списку workflow
import { WorkflowList } from '../models/workflow-list.model';
 
// Декоратор, який говорить Angular,
// що цей клас є сервісом
@Injectable({
  // providedIn: 'root' означає:
  // сервіс створюється ОДИН раз
  // і доступний у всьому застосунку
  providedIn: 'root'
})
export class WorkflowService {
 
  // Конструктор сервісу
  // Тут нічого не інжектимо, тому він порожній
  constructor() {}
 
  // КОНСТАНТИ
 
  // ЄДИНИЙ ключ для збереження ВСЬОГО workflow у localStorage
  // private — доступний тільки всередині сервісу
  // readonly — значення не можна змінити після ініціалізації
  private readonly STORAGE_KEY = 'workflowLists';
 
  // Ключ для збереження останнього використаного ID
  // Використовується для генерації унікальних ID
  private readonly ID_KEY = 'workflow_last_id';
 
  // ID GENERATOR
 
  /**
   * Генерує унікальний числовий ID
   * Використовується для lists / tickets / tasks
   */
  generateId(): number {
 
    // Отримуємо останній ID з localStorage
    // localStorage.getItem() повертає string або null
    // Number(...) перетворює значення в number
    // Якщо значення null → буде 0
    const lastId = Number(localStorage.getItem(this.ID_KEY)) || 0;
 
    // Створюємо новий ID, збільшуючи попередній на 1
    const newId = lastId + 1;
 
    // Зберігаємо новий ID у localStorage
    // щоб наступний ID був унікальний
    localStorage.setItem(this.ID_KEY, newId.toString());
 
    // Повертаємо новий ID
    return newId;
  }
 
  // READ
 
  /**
   * Отримує ВСІ workflow lists з localStorage
   * @returns масив WorkflowList
   */
  getLists(): WorkflowList[] {
    try {
      // Читаємо JSON-рядок з localStorage за ключем STORAGE_KEY
      const data = localStorage.getItem(this.STORAGE_KEY);
 
      // Якщо дані існують:
      // JSON.parse перетворює рядок у масив обʼєктів
      // Якщо даних немає — повертаємо порожній масив
      return data ? JSON.parse(data) : [];
    } catch (error) {
      // Якщо сталася помилка парсингу JSON
      console.error('Erro ao ler localStorage', error);
 
      // Повертаємо порожній масив,
      // щоб застосунок не впав
      return [];
    }
  }
 
  // SAVE (PRIVATE)
 
  /**
   * Зберігає ВСІ workflow lists у localStorage
   * private — використовується тільки всередині сервісу
   */
  saveLists(lists: WorkflowList[]): void {
    try {
      // JSON.stringify перетворює масив обʼєктів у рядок
      // localStorage може зберігати ТІЛЬКИ рядки
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(lists));
    } catch (error) {
      // Помилка може виникнути, якщо localStorage переповнений
      console.error('Erro ao guardar localStorage', error);
    }
  }
 
  // CREATE
 
  /**
   * Додає новий workflow list
   */
  addList(list: WorkflowList): void {
 
    // Отримуємо поточний масив списків
    const lists = this.getLists();
 
    // Додаємо новий список у масив
    lists.push(list);
 
    // Зберігаємо оновлений масив назад у localStorage
    this.saveLists(lists);
  }
 
  // ============================
  // UPDATE
  // ============================
 
  /**
   * Редагує існуючий workflow list
   */
  editList(updatedList: WorkflowList): void {
 
    // Отримуємо всі списки
    const lists = this.getLists();
 
    // Шукаємо індекс списку з таким самим ID
    const index = lists.findIndex(l => l.Id === updatedList.Id);
 
    // Якщо список не знайдено — виходимо з методу
    if (index === -1) return;
 
    // Оновлюємо список
    // НЕ мутуємо напряму — створюємо новий обʼєкт
    lists[index] = {
 
      // Копіюємо всі старі дані списку
      // (tickets, tasks і т.д.)
      ...lists[index],
 
      // Замінюємо лише редаговані поля
      Name: updatedList.Name,
      Description: updatedList.Description,
      ProdutoId: updatedList.ProdutoId
    };
 
    // Зберігаємо оновлений масив
    this.saveLists(lists);
  }
 
 
  // DELETE
 
 
  /**
   * Видаляє workflow list за ID
   */
  removeList(id: number): void {
 
    // Фільтруємо масив:
    // залишаємо тільки ті списки,
    // ID яких НЕ дорівнює переданому
    const lists = this.getLists().filter(l => l.Id !== id);
 
    // Зберігаємо новий масив без видаленого елемента
    this.saveLists(lists);
  }
 
  // CLEAR
 
  /**
   * Повністю очищає localStorage
   * УВАГА: видаляє ВСІ дані сайту
   */
  clear(): void {
    localStorage.clear();
  }
}